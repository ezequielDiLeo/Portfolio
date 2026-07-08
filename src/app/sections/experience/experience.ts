import { CommonModule } from '@angular/common';
import { afterNextRender, Component, computed, inject } from '@angular/core';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../services/language';
import { ExperienceItem } from '../../interfaces/interfaces';
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

@Component({
  selector: 'app-experience',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {

   readonly lang = inject(LanguageService);
    readonly experiences = computed<ExperienceItem[]>(() => {
      this.lang.currentLang();

      return [
        {
          role: 'EXPERIENCE.ITEMS.ABSTI.ROLE',
          company: 'EXPERIENCE.ITEMS.ABSTI.COMPANY',
          period: 'EXPERIENCE.ITEMS.ABSTI.PERIOD',
          desc: 'EXPERIENCE.ITEMS.ABSTI.DESCRIPTION'
        },

        {
          role: 'EXPERIENCE.ITEMS.LEGAL.ROLE',
          company: 'EXPERIENCE.ITEMS.LEGAL.COMPANY',
          period: 'EXPERIENCE.ITEMS.LEGAL.PERIOD',
          desc: 'EXPERIENCE.ITEMS.LEGAL.DESCRIPTION'
        },

        {
          role: 'EXPERIENCE.ITEMS.PERSONAL.ROLE',
          company: 'EXPERIENCE.ITEMS.PERSONAL.COMPANY',
          period: 'EXPERIENCE.ITEMS.PERSONAL.PERIOD',
          desc: 'EXPERIENCE.ITEMS.PERSONAL.DESCRIPTION'
        }
      ];
    });

    constructor() {
        afterNextRender(() => {
          this.initAnimations();
        });
    }

  private initAnimations(): void {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      '.exp-title',
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '#experience',
          start: 'top 80%',
          once: true
        }
      }
    );

    gsap.utils.toArray('.exp-item').forEach((item: any, index) => {
      gsap.from(item, {
        opacity: 0,
        scale: 0.8,
        y: 60,
        duration: 1,
        ease: 'power3.out',

        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    gsap.fromTo('.exp-dot',
      { scale: 0 },
      {
        scale: 1,
        stagger: 0.2,
        duration: 0.6,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: '#experience',
          start: 'top 75%',
          once: true
        }
      }
    );

    gsap.set('.exp-line-fill', {
      height: '0%'
    });

    gsap.to('.exp-line-fill', {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.exp-list',
        start: 'top 70%',
        end: 'bottom 80%',
        scrub: 1
      }
    });
  }

}
