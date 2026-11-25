import { Component, OnDestroy, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements OnDestroy {
  readonly email = 'ezemr@1996@gmail.com';
  readonly copied = signal(false);
  readonly submissionStatus = signal<'idle' | 'sending' | 'success' | 'error'>('idle');
  private resetTimer: ReturnType<typeof setTimeout> | null = null;

  async sendMessage(event: Event): Promise<void> {
    event.preventDefault();

    const form = event.currentTarget;

    if (!(form instanceof HTMLFormElement) || !form.reportValidity()) {
      return;
    }

    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string' ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      this.submissionStatus.set('error');
      return;
    }

    this.submissionStatus.set('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim()
        })
      });

      if (!response.ok) {
        throw new Error(`Contact API returned status ${response.status}.`);
      }

      form.reset();
      this.submissionStatus.set('success');
    } catch (error) {
      console.error(
        'Contact form submission failed.',
        error instanceof Error ? error.message : 'Unknown contact API error.'
      );
      this.submissionStatus.set('error');
    }
  }

  clearSubmissionStatus(): void {
    if (this.submissionStatus() !== 'sending') {
      this.submissionStatus.set('idle');
    }
  }

  async copyEmail(): Promise<void> {
    if (!navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(this.email);
      this.copied.set(true);

      if (this.resetTimer) {
        clearTimeout(this.resetTimer);
      }

      this.resetTimer = setTimeout(() => {
        this.copied.set(false);
        this.resetTimer = null;
      }, 2500);
    } catch {
      this.copied.set(false);
    }
  }

  ngOnDestroy(): void {
    if (this.resetTimer) {
      clearTimeout(this.resetTimer);
    }
  }
}
