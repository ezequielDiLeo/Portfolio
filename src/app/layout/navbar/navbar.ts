import {
  Component,
  inject,
  OnDestroy,
  afterNextRender,
  signal
} from '@angular/core';
import { LanguageService } from '../../services/language';

interface NavItem {
  readonly label: string;
  readonly id: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnDestroy {
  readonly language = inject(LanguageService);
  readonly theme = signal<'dark' | 'light'>('dark');

  readonly items: readonly NavItem[] = [
    { label: 'Ingeniería', id: 'engineering' },
    { label: 'Experiencia', id: 'experience' },
    { label: 'Stack', id: 'stack' },
    { label: 'Freelance', id: 'freelance' },
    { label: 'Contacto', id: 'contact' }
  ];

  readonly activeSection = signal<string>('hero');
  readonly menuOpen = signal<boolean>(false);

  private readonly sectionIds = [
    'hero',
    'engineering',
    'experience',
    'stack',
    'freelance',
    'contact'
  ];

  private observer: IntersectionObserver | null = null;

  constructor() {
    afterNextRender(() => {
      this.initializeTheme();
      this.initializeObserver();
    });
  }

  private initializeTheme(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    const savedTheme = localStorage.getItem('theme');
    const nextTheme = savedTheme === 'light' ? 'light' : 'dark';
    this.applyTheme(nextTheme);
  }

  toggleTheme(): void {
    this.applyTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }

  toggleLanguage(): void {
    this.language.toggleLang();
  }

  private applyTheme(theme: 'dark' | 'light'): void {
    this.theme.set(theme);
    document.documentElement.dataset['theme'] = theme;
    localStorage.setItem('theme', theme);
  }

  private initializeObserver(): void {
    if (!('IntersectionObserver' in window)) {
      return;
    }

    this.observer = new IntersectionObserver(
      entries => {
        const visibleEntry = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          this.activeSection.set(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: [0.05, 0.25, 0.5]
      }
    );

    this.sectionIds.forEach(id => {
      const section = document.getElementById(id);

      if (section) {
        this.observer?.observe(section);
      }
    });
  }

  toggleMenu(): void {
    this.menuOpen.update(open => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
