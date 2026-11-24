import { Component } from '@angular/core';
import { Hero } from '../../sections/hero/hero';
import { EngineeringProjects } from '../../sections/engineering-projects/engineering-projects';
import { Experience } from '../../sections/experience/experience';
import { TechStack } from '../../sections/tech-stack/tech-stack';
import { FreelanceGrid } from '../../sections/freelance-grid/freelance-grid';
import { Contact } from '../../sections/contact/contact';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Hero,
    EngineeringProjects,
    Experience,
    TechStack,
    FreelanceGrid,
    Contact
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {}
