import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export interface SkillNode {
  id: string;
  label: string;
  category: 'frontend' | 'backend' | 'tools';
  level: number;
  icon: string;
  /** Ángulo en grados (0 = 12h, 90 = 3h, 180 = 6h, 270 = 9h) */
  angle: number;
  /** Factor de radio: 0 = centro, 1 = borde del sistema. Default: 0.72 */
  radius?: number;
}

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills implements AfterViewInit, OnDestroy {

  nodes: SkillNode[] = [
    { id: 'n1', label: 'Angular',    category: 'frontend', level: 90, icon: 'angular',    angle:   0 },
    { id: 'n2', label: 'React',      category: 'frontend', level: 90, icon: 'react',      angle:  40 },
    { id: 'n3', label: 'TypeScript', category: 'frontend', level: 85, icon: 'typescript', angle:  80 },
    { id: 'n4', label: 'Java',       category: 'backend',  level: 60, icon: 'java',       angle: 120 },
    { id: 'n5', label: 'Tailwind',   category: 'frontend', level: 80, icon: 'tailwind',   angle: 160 },
    { id: 'n6', label: 'GSAP',       category: 'tools',    level: 70, icon: 'gsap',       angle: 200 },
    { id: 'n7', label: 'PrimeNG',    category: 'frontend', level: 70, icon: 'primeng',    angle: 240 },
    { id: 'n8', label: 'SQL Server', category: 'backend',  level: 60, icon: 'sql',        angle: 280 },
    { id: 'n9', label: 'Git',        category: 'tools',    level: 85, icon: 'git',        angle: 320 },
  ];

  /** Genera los inline styles de posicionamiento para cada nodo */
  nodeStyle(node: SkillNode): string {
    const r = node.radius ?? 0.72;
    return `--angle: ${node.angle}deg; --r: ${r};`;
  }

  coreLines = ['CORE SYSTEM', 'ALL MODULES ONLINE', 'DEV · v2.0', 'SYNC COMPLETE'];
  private coreLineIndex = 0;
  private coreInterval: any;
  private svgLines: SVGLineElement[] = [];
  private ctx: gsap.Context | null = null;

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.ctx = gsap.context(() => {
      this.initAnimations();
    });
    this.initSvgConnectors();
    this.startCoreTypewriter();
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
    clearInterval(this.coreInterval);
  }

  private initAnimations(): void {
    const trigger = { trigger: '.skills', start: 'top 80%' };

    gsap.from('.skills-scene', {
      opacity: 0, scale: 0.92, duration: 1.6, ease: 'power3.out',
      scrollTrigger: trigger
    });

    gsap.from('.sk-title-wrap', {
      opacity: 0, y: -30, duration: 1, ease: 'power2.out',
      scrollTrigger: { ...trigger, start: 'top 78%' }
    });

    gsap.from('.core', {
      opacity: 0, scale: 0.1, duration: 1.6, ease: 'back.out(1.8)',
      scrollTrigger: { ...trigger, start: 'top 75%' }
    });

    gsap.from('.orbit', {
      opacity: 0, scale: 0.4, stagger: 0.2, duration: 1.2, ease: 'power2.out',
      scrollTrigger: { ...trigger, start: 'top 75%' }
    });

    gsap.from('.sk-node', {
      opacity: 0, scale: 0.2, y: 20, stagger: 0.1, duration: 0.9, ease: 'back.out(2)', delay: 0.4,
      scrollTrigger: { ...trigger, start: 'top 72%' }
    });

    // gsap.from('.sk-connector', {
    //   opacity: 0, duration: 1.5, delay: 0.8, stagger: 0.08,
    //   scrollTrigger: { ...trigger, start: 'top 72%' }
    // });

    // Float
    document.querySelectorAll<HTMLElement>('.node-animated-wrapper').forEach((innerNode, i) => {
      gsap.to(innerNode, {
        y: `+=${6 + i * 1.5}`, // Ahora la flotación es local y segura
        duration: 2.2 + i * 0.3,
        repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
    });

    // Core breathing
    gsap.to('.core', {
      boxShadow: `
        0 0 70px rgba(0,212,255,.45),
        0 0 160px rgba(0,212,255,.18),
        inset 0 0 40px rgba(0,212,255,.12)
      `,
      duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut'
    });

    gsap.to('.orbit-1', { rotation: 360,  duration: 30, repeat: -1, ease: 'none', transformOrigin: 'center' });
    gsap.to('.orbit-2', { rotation: -360, duration: 50, repeat: -1, ease: 'none', transformOrigin: 'center' });

    document.querySelectorAll<HTMLElement>('.particle').forEach((p, i) => {
      gsap.to(p, {
        y: -20 - i * 4, x: 12 - i * 2, opacity: 0.1,
        duration: 3 + i * 0.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
    });

    gsap.to('.sk-scanline', { top: '100%', duration: 3, repeat: -1, ease: 'none', delay: 1 });
  }

  private initSvgConnectors(): void {
    const svg    = document.querySelector<SVGElement>('.sk-svg-connectors');
    const core   = document.querySelector<HTMLElement>('.core');
    const system = document.querySelector<HTMLElement>('.system');
    if (!svg || !core || !system) return;

    const sysRect  = system.getBoundingClientRect();
    const coreRect = core.getBoundingClientRect();
    const cx = coreRect.left - sysRect.left + coreRect.width  / 2;
    const cy = coreRect.top  - sysRect.top  + coreRect.height / 2;

    document.querySelectorAll<HTMLElement>('.sk-node').forEach((node, i) => {
      const nRect = node.getBoundingClientRect();
      const nx = nRect.left - sysRect.left + nRect.width  / 2;
      const ny = nRect.top  - sysRect.top  + nRect.height / 2;

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', cx.toString());
      line.setAttribute('y1', cy.toString());
      line.setAttribute('x2', nx.toString());
      line.setAttribute('y2', ny.toString());
      line.classList.add('sk-connector');
      svg.appendChild(line);

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('r', '3');
      circle.classList.add('sk-energy-dot');
      svg.appendChild(circle);

      const dur = 2 + i * 0.4;
      gsap.to(circle, {
        motionPath: {
          path: [{ x: cx, y: cy }, { x: nx, y: ny }],
          curviness: 0,
        },
        duration: dur, repeat: -1, ease: 'none', delay: i * 0.3,
        onRepeat: () => gsap.set(circle, { x: cx, y: cy }),
      });

      this.svgLines.push(line);
    });
  }

  private startCoreTypewriter(): void {
    const el = document.querySelector<HTMLElement>('.core-text');
    if (!el) return;
    this.coreInterval = setInterval(() => {
      this.coreLineIndex = (this.coreLineIndex + 1) % this.coreLines.length;
      el.classList.add('flicker');
      setTimeout(() => {
        el.textContent = this.coreLines[this.coreLineIndex];
        el.classList.remove('flicker');
      }, 200);
    }, 2500);
  }

  onNodeHover(nodeId: string): void {
    const idx = this.nodes.findIndex(n => n.id === nodeId);
    if (idx >= 0 && this.svgLines[idx]) {
      gsap.to(this.svgLines[idx], {
        attr: { 'stroke-width': 2, 'stroke-opacity': 0.9 }, duration: 0.3
      });
    }
  }

  onNodeLeave(nodeId: string): void {
    const idx = this.nodes.findIndex(n => n.id === nodeId);
    if (idx >= 0 && this.svgLines[idx]) {
      gsap.to(this.svgLines[idx], {
        attr: { 'stroke-width': 1, 'stroke-opacity': 0.25 }, duration: 0.4
      });
    }
  }

  getLevelLabel(level: number): string {
    if (level >= 88) return 'EXPERT';
    if (level >= 75) return 'ADVANCED';
    if (level >= 60) return 'INTERMEDIATE';
    return 'PROFICIENT';
  }
}
