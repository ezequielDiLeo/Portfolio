import { Component, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements OnDestroy {
  readonly email = 'ezemr@1996@gmail.com';
  readonly copied = signal(false);
  private resetTimer: ReturnType<typeof setTimeout> | null = null;

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
