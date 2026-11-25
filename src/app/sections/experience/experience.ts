import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './experience.html',
  styleUrl: './experience.scss'
})
export class Experience {}
