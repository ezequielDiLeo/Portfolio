import { Injectable, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private translate = inject(TranslateService);
  private document = inject(DOCUMENT);
  private title = inject(Title);
  private meta = inject(Meta);

  currentLang = signal<'es' | 'en'>('es');

  constructor() {

    this.translate.addLangs(['es', 'en']);

    const saved = typeof localStorage === 'undefined'
      ? null
      : localStorage.getItem('lang');

    const browserLang =
      typeof navigator === 'undefined' || navigator.language.startsWith('es')
        ? 'es'
        : 'en';

    const lang = saved === 'es' || saved === 'en' ? saved : browserLang;

    this.setLang(lang);
  }

  setLang(lang: 'es' | 'en') {
    const isSpanish = lang === 'es';
    const pageTitle = isSpanish
      ? 'Ezequiel Di Leo | Desarrollador Full-Stack y Frontend'
      : 'Ezequiel Di Leo | Full-Stack & Frontend Developer';
    const pageDescription = isSpanish
      ? 'Desarrollador Full-Stack y Frontend especializado en Angular, TypeScript, Java/Spring y Node/NestJS. Más de 2 años construyendo aplicaciones empresariales escalables.'
      : 'Full-Stack and Frontend developer specializing in Angular, TypeScript, Java/Spring, and Node/NestJS. Over 2 years building scalable enterprise applications.';
    this.currentLang.set(lang);

    this.translate.use(lang);
    this.document.documentElement.lang = lang;
    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: pageDescription });
    this.meta.updateTag({ property: 'og:locale', content: isSpanish ? 'es_AR' : 'en_US' });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: pageDescription });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: pageDescription });

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('lang', lang);
    }
  }

  instant(key: string) {
    this.currentLang();
    return this.translate.instant(key);
  }

  toggleLang() {
    this.setLang(this.currentLang() === 'es' ? 'en' : 'es');
  }
}
