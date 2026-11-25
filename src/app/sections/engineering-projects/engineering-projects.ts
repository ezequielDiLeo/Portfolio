import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-engineering-projects',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './engineering-projects.html',
  styleUrl: './engineering-projects.scss'
})
export class EngineeringProjects {
  updatePointer(event: PointerEvent): void {
    if (event.pointerType !== 'mouse' || !event.isPrimary) {
      return;
    }

    const card = event.currentTarget;

    if (!(card instanceof HTMLElement)) {
      return;
    }

    const bounds = card.getBoundingClientRect();
    card.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
    card.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
  }
}
