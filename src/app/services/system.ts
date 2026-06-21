import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SystemService {

  activeSection = signal<string>('hero');

  setSection(section: string) {
    this.activeSection.set(section);
  }

}
