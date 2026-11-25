import { Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {
  private readonly language = inject(LanguageService);
  readonly marqueeWords = computed(() => this.language.currentLang() === 'es'
    ? ['Frontend', 'Backend', 'Producto', 'Arquitectura']
    : ['Frontend', 'Backend', 'Product', 'Architecture']);
}
