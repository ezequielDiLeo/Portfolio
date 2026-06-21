import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  afterNextRender,
  output,
  signal,
  viewChild
} from '@angular/core';

import { gsap } from 'gsap';

interface LogLine {
  text: string;
  type: 'system' | 'ok' | 'data' | 'warn';
  visible: boolean;
}

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './intro.html',
  styleUrl: './intro.scss'
})
export class Intro {

  done = output<void>();

  loader = viewChild<ElementRef<HTMLElement>>('loader');

  progress = signal(0);
  glitchActive = signal(false);
  visible = signal(true);

  lines = signal<LogLine[]>([
    { text: '> INITIALIZING NAVIGATION SYSTEM...', type: 'system', visible: false },
    { text: '> SCANNING STELLAR COORDINATES....', type: 'system', visible: false },
    { text: '  [OK] Angular core module loaded', type: 'ok', visible: false },
    { text: '  [OK] TypeScript engine online', type: 'ok', visible: false },
    { text: '  [DATA] Fetching portfolio records', type: 'data', visible: false },
    { text: '  [OK] Java backend link established', type: 'ok', visible: false },
    { text: '  [DATA] Loading mission logs...', type: 'data', visible: false },
    { text: '  [OK] UI components synchronized', type: 'ok', visible: false },
    { text: '> ALL SYSTEMS OPERATIONAL', type: 'system', visible: false },
    { text: '> LAUNCHING INTERFACE...', type: 'warn', visible: false }
  ]);

  constructor() {
    afterNextRender(() => {
      this.runSequence();
    });
  }

  private runSequence(): void {
    const totalDuration = 3000;
    const lineDelay = totalDuration / (this.lines().length + 2);

    this.lines().forEach((_, index) => {
      setTimeout(() => {
        this.lines.update(lines => {
          const updated = [...lines];

          updated[index] = {
            ...updated[index],
            visible: true
          };

          return updated;
        });
      }, lineDelay * (index + 1));
    });

    const progressInterval = setInterval(() => {
      if (this.progress() < 100) {
        this.progress.update(v => Math.min(v + 1.5, 100));
      } else {
        clearInterval(progressInterval);
      }
    }, totalDuration / 70);

    setTimeout(() => {
      this.glitchActive.set(true);

      setTimeout(() => {
        this.glitchActive.set(false);
      }, 400);
    }, totalDuration * 0.7);

    // Fade out
    setTimeout(() => {
      const loaderElement = this.loader()?.nativeElement;

      if (loaderElement) {
        gsap.to(loaderElement, {
          opacity: 0,
          scale: 1.04,
          duration: 0.7,
          ease: 'power2.in',
          onComplete: () => {
            this.visible.set(false);
            this.done.emit();
          }
        });
      } else {
        this.visible.set(false);
        this.done.emit();
      }
    }, totalDuration + 400);
  }
}
