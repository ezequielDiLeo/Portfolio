import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AfterViewInit, Component, ElementRef } from '@angular/core';
import gsap from 'gsap';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import { TranslatePipe } from '@ngx-translate/core';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements AfterViewInit {

  name = '';
  email = '';
  message = '';

  sending = false;
  sent = false;
  error = false;

  constructor(
    private el: ElementRef
  ) {}

  ngAfterViewInit(): void {

    const ctx = gsap.context(() => {

      // Entrada izquierda
      gsap.from('.signal-panel', {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Entrada centro
      gsap.from('.contact-terminal', {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: .2,
        ease: 'power3.out'
      });

      // Entrada derecha
      gsap.from('.status-panel', {
        x: 100,
        opacity: 0,
        duration: 1,
        delay: .4,
        ease: 'power3.out'
      });

      // Radar girando
      gsap.to('.radar', {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: 'none'
      });

      // Scanner terminal
      const terminal =
        this.el.nativeElement.querySelector(
          '.contact-terminal'
        );

      if (terminal) {
        gsap.to('.terminal-scanner', {
          y: terminal.clientHeight - 4,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'none'
        });

      }

      // Parpadeo panel status
      gsap.to('.status-box', {
        boxShadow:
          '0 0 25px rgba(0,212,255,.2)',
        duration: 1.5,
        stagger: .3,
        repeat: -1,
        yoyo: true

      });

      // Hover automático links
      gsap.to('.signal-links a', {
        boxShadow:
          '0 0 25px rgba(0,212,255,.15)',
        duration: 1.5,
        stagger: .2,
        repeat: -1,
        yoyo: true
      });

    }, this.el.nativeElement);

  }

  async sendMessage() {

    if (!this.name || !this.email || !this.message) return;

    this.sending = true;
    this.sent = false;
    this.error = false;

    try {
      console.log('Enviando email...');
      const response = emailjs.send(
        'service_pn1fv9v',
        'template_4r4zbtb',
        {
          from_name: this.name,
          from_email: this.email,
          message: this.message,
        },
        '7MN3wCU9KJHYMXmvk'
      );
console.log('OK', response);
      this.sent = true;

      // limpiar form
      this.name = '';
      this.email = '';
      this.message = '';

      // opcional: reset visual después de unos segundos
      setTimeout(() => {
        this.sent = false;
      }, 4000);

    } catch (err) {
      console.error('ERROR EMAILJS', err);
      this.error = true;

      setTimeout(() => {
        this.error = false;
      }, 4000);

    } finally {
      console.log('FINALIZADO');
      this.sending = false;
    }
  }

}
