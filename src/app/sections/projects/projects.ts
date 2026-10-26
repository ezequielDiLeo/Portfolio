import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LanguageService } from '../../services/language';
import { Project } from '../../interfaces/interfaces';
import { TranslatePipe } from '@ngx-translate/core';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TranslatePipe],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements AfterViewInit, OnDestroy {

  // Signals
  isTransitioning = false;
  selectedId = signal<Project['id']>('MSN-001');

  // Privates
  private ctx!: gsap.Context;

  // Readonlys
  readonly lang = inject(LanguageService);
  readonly projects = computed<Project[]>(() => {
    this.lang.currentLang();

    return [
      {
        id: 'MSN-001',
        codename: 'LEXOR',
        title: this.lang.instant('PROJECTS.ITEMS.LEXOR.TITLE'),
        status: 'DEPLOYED',
        year: '2024',
        description: this.lang.instant('PROJECTS.ITEMS.LEXOR.DESCRIPTION'),
        details: this.lang.instant('PROJECTS.ITEMS.LEXOR.DETAILS'),
        stack: ['Angular', 'Java', 'TypeScript', 'SQL Server', 'PrimeNG'],
        image: 'utreraNos.png',
        link: 'https://www.utrerac.com/home'
      },
      {
        id: 'MSN-002',
        codename: 'NOVA',
        title: this.lang.instant('PROJECTS.ITEMS.NOVA.TITLE'),
        status: 'DEPLOYED',
        year: '2025',
        description: this.lang.instant('PROJECTS.ITEMS.NOVA.DESCRIPTION'),
        details: this.lang.instant('PROJECTS.ITEMS.NOVA.DETAILS'),
        stack: ['React', 'CSS', 'JavaScript', 'Responsive Design'],
        image: 'tiendaOnline.png',
        link: 'https://clothingcye.netlify.app/'
      },
      {
        id: 'MSN-003',
        codename: 'STELLAR',
        title: this.lang.instant('PROJECTS.ITEMS.STELLAR.TITLE'),
        status: 'IN PROGRESS',
        year: '2025',
        description: this.lang.instant('PROJECTS.ITEMS.STELLAR.DESCRIPTION'),
        details: this.lang.instant('PROJECTS.ITEMS.STELLAR.DETAILS'),
        stack: ['Angular', 'GSAP', 'Three.js', 'SCSS'],
        image: 'portfolio.png',
      },
      {
        id: 'MSN-004',
        codename: 'RICKVERSE',
        title: this.lang.instant('PROJECTS.ITEMS.RICKVERSE.TITLE'),
        status: 'ACTIVE',
        year: '2024',
        description: this.lang.instant('PROJECTS.ITEMS.RICKVERSE.DESCRIPTION'),
        details: this.lang.instant('PROJECTS.ITEMS.RICKVERSE.DETAILS'),
        stack: ['Angular', 'SCSS', 'REST API', 'RxJS'],
        image: 'rymPage.webp',
        link: 'https://rym-page.vercel.app/intro'
      },
    ];
  });

  readonly selected = computed(() => {
    return (
      this.projects().find(p => p.id === this.selectedId()) ??
      this.projects()[0]
    );
  });


  // Constructor
  constructor(private el: ElementRef) {}

  // Lifecycle hooks
  ngAfterViewInit(): void {
    this.ctx = gsap.context(() => {
      gsap.from('.prj-section-tag', {
        opacity: 0, y: 20, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.projects', start: 'top 80%', once: true },
      });
      gsap.from('.prj-title', {
        opacity: 0, y: 40, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.projects', start: 'top 78%', once: true },
      });
      gsap.from('.prj-terminal', {
        opacity: 0, y: 60, duration: 1.1, ease: 'power3.out', delay: 0.15,
        scrollTrigger: { trigger: '.projects', start: 'top 75%', once: true },
      });

    }, this.el.nativeElement);

    setTimeout(() => this.bootDetailPanel(), 400);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }

  // Methods
  selectProject(project: Project): void {
    if (this.isTransitioning || project.id === this.selected().id) {
      return;
    }

    this.isTransitioning = true;
    const panel = this.el.nativeElement.querySelector('.prj-detail-inner');
    gsap.to(panel, {
      opacity: 0,
      x: 16,
      duration: .22,
      ease: 'power2.in',
      onComplete: () => {
        this.selectedId.set(project.id);

        gsap.fromTo(
          panel,
          {
            opacity: 0,
            x: -16
          },
          {
            opacity: 1,
            x: 0,
            duration: .35,
            ease: 'power2.out',
            onComplete: () => this.isTransitioning = false
          }
        );
      }
    });
  }

  private bootDetailPanel(): void {
    const panel = (this.el.nativeElement as HTMLElement)
      .querySelector('.prj-detail-inner') as HTMLElement;
    if (!panel) return;
    gsap.from(panel, { opacity: 0, x: -20, duration: 0.5, ease: 'power2.out' });
  }

  openLink(link?: string): void {
    if (link) window.open(link, '_blank', 'noopener');
  }

  statusColor(status: Project['status']): string {
    const map: Record<Project['status'], string> = {
      'DEPLOYED':    '#00ff88',
      'ACTIVE':      '#00d4ff',
      'IN PROGRESS': '#fbbf24',
      'CLASSIFIED':  '#ef4444',
    };
    return map[status];
  }
}
