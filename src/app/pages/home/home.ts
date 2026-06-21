import { Component } from '@angular/core';
import { Hero } from "../../sections/hero/hero";
import { About } from "../../sections/about/about";
import { Skills } from "../../sections/skills/skills";
import { Projects } from "../../sections/projects/projects";
import { Experience } from "../../sections/experience/experience";
import { Contact } from "../../sections/contact/contact";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Hero, About, Skills, Projects, Experience, Contact],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
