import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({ delay: 0.1 });

      tl.from('.hero-photo', {
        opacity: 0,
        scale: 0.75,
        duration: 1.1,
        ease: 'power3.out',
      })

      .from('.hero-badge', {
        opacity: 0,
        y: 24,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.75')

      .from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 0.75,
        ease: 'power3.out',
      }, '-=0.3')

      .from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.45')

      .from('.hero-description', {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.4')

      .from('.hero-stat', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.4')

      .from('.hero-stack', {
        opacity: 0,
        y: 16,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.3')

      .from('.hero-actions', {
        opacity: 0,
        y: 16,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.35');

      // Float continuo de la foto
      gsap.to('.hero-photo', {
        y: -12,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Scanner
      const img   = this.el.nativeElement.querySelector('.hero__image') as HTMLImageElement;
      const frame = this.el.nativeElement.querySelector('.hero-frame')  as HTMLElement;

      const startScanner = () => {
        if (!frame) return;
        const target = frame.clientHeight - 4;
        gsap.to('.hero-scanner', {
          y: target,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: 'none',
        });
      };

      if (img && !img.complete) {
        img.addEventListener('load', startScanner, { once: true });
      } else {
        startScanner();
      }

    }, this.el.nativeElement);
  }


  scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }


}
