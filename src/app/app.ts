import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Intro } from "./sections/intro/intro";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SpaceBackground } from "./layout/background/background";
import { Navbar } from "./layout/navbar/navbar";
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  imports: [CommonModule, Intro, RouterOutlet, SpaceBackground, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {

  loading = true;
  private lenis!: Lenis;

  ngAfterViewInit(): void {

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    this.lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    // 🔥 Lenis → GSAP sync (CORRECTO)
    this.lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  onLoaderDone(): void {
    this.loading = false;

    setTimeout(() => {
      gsap.from('.app-content', {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    }, 50);
  }
}
