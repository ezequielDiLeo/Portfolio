import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface Project {
  id: string;           // MISSION_001
  codename: string;     // nombre corto tipo callsign
  title: string;
  status: 'DEPLOYED' | 'ACTIVE' | 'IN PROGRESS' | 'CLASSIFIED';
  year: string;
  description: string;
  details: string;      // texto más largo para el panel derecho
  stack: string[];
  image: string;
  link?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements AfterViewInit, OnDestroy {

  isTransitioning = false;
  private ctx!: gsap.Context;

  get projects(): Project[] { return this._projects; }

  private _projects: Project[] = [
    {
      id: 'MSN-001',
      codename: 'LEXOR',
      title: 'Legal Management System',
      status: 'DEPLOYED',
      year: '2024',
      description: 'Platform for a law firm — document management, legal records and client administration.',
      details: 'Full-stack system built for a law firm to centralize case management, automate document workflows, and track client history. Features role-based access, real-time notifications, and a reporting dashboard.',
      stack: ['Angular', 'Java', 'TypeScript', 'SQL Server', 'PrimeNG'],
      image: 'utreraC.webp',
    },
    {
      id: 'MSN-002',
      codename: 'RICKVERSE',
      title: 'Rick & Morty Universe',
      status: 'ACTIVE',
      year: '2024',
      description: 'Interactive experience consuming the R&M API with futuristic interfaces and animated effects.',
      details: 'SPA that consumes the Rick & Morty public API to browse characters, episodes, and locations with a sci-fi themed interface. Includes filtering, search, infinite scroll, and character detail views.',
      stack: ['Angular', 'SCSS', 'REST API', 'RxJS'],
      image: 'rymPage.webp',
      link: 'https://rym-page.vercel.app/intro'
    },
    {
      id: 'MSN-003',
      codename: 'STELLAR',
      title: 'Interstellar Portfolio',
      status: 'IN PROGRESS',
      year: '2025',
      description: 'Immersive portfolio inspired by futuristic OS, black holes and sci-fi experiences.',
      details: 'This very portfolio — an immersive, animated personal site built with Angular, GSAP ScrollTrigger and (soon) Three.js. Every section is a different "module" of a starship interface.',
      stack: ['Angular', 'GSAP', 'Three.js', 'SCSS'],
      image: 'portfolio.webp',
    },
  ];

  selected = signal<Project>(this.projects[0]);
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.ctx = gsap.context(() => {

      // Section entrance
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

    // Initial detail panel boot animation
    setTimeout(() => this.bootDetailPanel(), 400);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }

  selectProject(project: Project): void {
    if (this.isTransitioning || project.id === this.selected().id) return;
    this.isTransitioning = true;

    const panel = (this.el.nativeElement as HTMLElement)
      .querySelector('.prj-detail-inner') as HTMLElement;

    // Exit current
    gsap.to(panel, {
      opacity: 0, x: 16, duration: 0.22, ease: 'power2.in',
      onComplete: () => {
        this.selected.set(project);
        // Enter new
        gsap.fromTo(panel,
          { opacity: 0, x: -16 },
          {
            opacity: 1, x: 0, duration: 0.35, ease: 'power2.out',
            onComplete: () => { this.isTransitioning = false; },
          }
        );
      },
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
