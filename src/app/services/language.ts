import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private translate = inject(TranslateService);

  currentLang = signal<'es' | 'en'>('es');

  constructor() {

    this.translate.addLangs(['es', 'en']);

    const saved = localStorage.getItem('lang') as 'es' | 'en' | null;

    const browserLang = navigator.language.startsWith('es') ? 'es' : 'en';

    const lang = saved ?? browserLang;

    this.setLang(lang);
  }

  setLang(lang: 'es' | 'en') {

    this.currentLang.set(lang);

    this.translate.use(lang);

    localStorage.setItem('lang', lang);
  }

  instant(key: string) {
    this.currentLang();
    return this.translate.instant(key);
  }

  toggleLang() {
    this.setLang(this.currentLang() === 'es' ? 'en' : 'es');
  }
}
