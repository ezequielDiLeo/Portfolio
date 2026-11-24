import { Component } from '@angular/core';

interface FreelanceProject {
  readonly index: string;
  readonly name: string;
  readonly url: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly description: string;
  readonly service: string;
}

@Component({
  selector: 'app-freelance-grid',
  standalone: true,
  templateUrl: './freelance-grid.html',
  styleUrl: './freelance-grid.scss'
})
export class FreelanceGrid {
  readonly projects: readonly FreelanceProject[] = [
    {
      index: '01',
      name: 'Fearless Salon',
      url: 'https://fearless-barber.netlify.app',
      image: '/fearless.png',
      imageAlt: 'Vista previa del sitio comercial Fearless Salon',
      description: 'Web comercial moderna para salón de estilismo con identidad visual personalizada y reserva directa.',
      service: 'Diseño + Desarrollo'
    },
    {
      index: '02',
      name: 'Utrera',
      url: 'https://utrerac.com',
      image: '/utreraC.png',
      imageAlt: 'Vista previa del sitio corporativo Utrera',
      description: 'Sitio corporativo en producción optimizado para conversión, velocidad de carga y posicionamiento web.',
      service: 'Desarrollo + Performance'
    },
    {
      index: '03',
      name: 'Clothing C&E',
      url: 'https://clothingcye.netlify.app',
      image: '/tiendaOnline.png',
      imageAlt: 'Vista previa del catálogo digital Clothing C&E',
      description: 'Catálogo digital con interfaz comercial responsive orientada a una experiencia mobile-first.',
      service: 'Frontend + Responsive'
    }
  ];
}
