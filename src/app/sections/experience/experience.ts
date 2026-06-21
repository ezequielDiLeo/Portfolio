import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience implements AfterViewInit {

  experiences = [
    {
      role: 'Systems Programmer',
      company: 'ABSTI',
      period: '2024 — PRESENT',
      desc: 'Development of enterprise software solutions for financial, insurance and logistics sectors. Working with Angular, React, Java and SQL Server environments.'
    },
    {
      role: 'Freelance Developer',
      company: 'Legal Management Systems',
      period: '2023 — 2024',
      desc: 'Design and implementation of legal document management platforms, internal dashboards and administrative tools.'
    },
    {
      role: 'Frontend Development Journey',
      company: 'Independent Projects',
      period: '2022 — 2023',
      desc: 'Creation of experimental interfaces, API integrations, portfolio systems and modern frontend architectures.'
    }
  ];

  ngAfterViewInit(): void {

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
