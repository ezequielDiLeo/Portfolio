import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {

    const ctx = gsap.context(() => {

      // TERMINAL ENTRY
      gsap.from('.terminal', {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.terminal',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      // BOOT SEQUENCE LINES
      gsap.to('.terminal-line', {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.18,
        delay: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.terminal',
          start: 'top 80%',
        }
      });

      // HEADER GLOW INTRO
      gsap.from('.terminal__header', {
        opacity: 0,
        y: -10,
        duration: 0.6,
        delay: 0.3,
        ease: 'power2.out'
      });

      // SCANLINE INTENSITY (subtle feel alive)
      gsap.fromTo('.scanline',
        { opacity: 0 },
        { opacity: 0.6, duration: 1.2 }
      );

    }, this.el.nativeElement);
  }
}
