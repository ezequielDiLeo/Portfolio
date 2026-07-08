import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  House,
  User,
  Brain,
  Briefcase,
  ChartNetwork,
  Mail
} from 'lucide-angular';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements AfterViewInit {

  // Language
  lang = inject(LanguageService);

  // Icons
  readonly House = House;
  readonly User = User;
  readonly Brain = Brain;
  readonly Briefcase = Briefcase;
  readonly ChartNetwork = ChartNetwork;
  readonly Mail = Mail;

  activeSection = signal<string>('hero');

  setActive(section: string) {
    this.activeSection.set(section);
  }

  ngAfterViewInit(): void {

    const sections = document.querySelectorAll(
      '#hero, #about, #skills, #projects, #experience, #contact'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-35% 0px -35% 0px',
        threshold: 0.1
      }
    );

    sections.forEach((section) => observer.observe(section));
  }
}
