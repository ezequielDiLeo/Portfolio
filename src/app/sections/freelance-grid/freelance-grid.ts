import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

interface FreelanceProject {
  readonly index: string;
  readonly name: string;
  readonly url?: string;
  readonly image: string;
  readonly translationKey: string;
  readonly statusKey?: string;
}

@Component({
  selector: 'app-freelance-grid',
  standalone: true,
  imports: [TranslatePipe],
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
      translationKey: 'FEARLESS'
    },
    {
      index: '02',
      name: 'Utrera',
      url: 'https://utrerac.com',
      image: '/utreraC.png',
      translationKey: 'UTRERA'
    },
    {
      index: '03',
      name: 'Clothing C&E',
      url: 'https://clothingcye.netlify.app',
      image: '/tiendaOnline.png',
      translationKey: 'CLOTHING'
    },
    {
      index: '04',
      name: 'Investors Trust',
      image: '/investors-trust.png',
      translationKey: 'INVESTORS_TRUST',
      statusKey: 'CLIENT_WORK'
    }
  ];
}
