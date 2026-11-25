interface VercelRequest {
  method?: string;
  body: unknown;
  headers: {
    origin?: string | string[];
    host?: string | string[];
    'x-forwarded-host'?: string | string[];
  };
}

interface VercelResponse {
  setHeader(name: string, value: string): void;
  status(code: number): this;
  json(body: unknown): this;
}

type RuntimeGlobal = typeof globalThis & {
  process?: {
    env: Record<string, string | undefined>;
  };
};

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function headerValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function isContactPayload(value: unknown): value is ContactPayload {
  if (!isRecord(value)) {
    return false;
  }

  const { name, email, message } = value;

  return (
    typeof name === 'string' &&
    name.trim().length >= 2 &&
    name.trim().length <= 100 &&
    typeof email === 'string' &&
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    typeof message === 'string' &&
    message.trim().length >= 10 &&
    message.trim().length <= 5000
  );
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  const origin = headerValue(req.headers.origin);
  const host = headerValue(req.headers['x-forwarded-host']) ?? headerValue(req.headers.host);

  if (origin && host) {
    try {
      if (new URL(origin).host !== host.split(',')[0].trim()) {
        res.status(403).json({ error: 'origin_not_allowed' });
        return;
      }
    } catch {
      res.status(403).json({ error: 'origin_not_allowed' });
      return;
    }
  }

  const payload = req.body;

  if (!isContactPayload(payload)) {
    res.status(400).json({ error: 'invalid_contact_payload' });
    return;
  }

  const {
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    EMAILJS_PUBLIC_KEY,
    EMAILJS_PRIVATE_KEY,
    CONTACT_EMAIL
  } = (globalThis as RuntimeGlobal).process?.env ?? {};

  if (
    !EMAILJS_SERVICE_ID ||
    !EMAILJS_TEMPLATE_ID ||
    !EMAILJS_PUBLIC_KEY ||
    !EMAILJS_PRIVATE_KEY ||
    !CONTACT_EMAIL
  ) {
    console.error('Contact API is missing required environment configuration.');
    res.status(500).json({ error: 'contact_service_unavailable' });
    return;
  }

  try {
    const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        accessToken: EMAILJS_PRIVATE_KEY,
        template_params: {
          to_email: CONTACT_EMAIL,
          from_name: payload.name.trim(),
          from_email: payload.email.trim(),
          reply_to: payload.email.trim(),
          message: payload.message.trim()
        }
      })
    });

    if (!emailResponse.ok) {
      console.error(`EmailJS rejected contact form request with status ${emailResponse.status}.`);
      res.status(502).json({ error: 'email_delivery_failed' });
      return;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(
      'EmailJS contact request failed.',
      error instanceof Error ? error.message : 'Unknown provider error.'
    );
    res.status(502).json({ error: 'email_delivery_failed' });
  }
}
