import { Component } from '@angular/core';

interface StackGroup {
  readonly index: string;
  readonly title: string;
  readonly description: string;
  readonly technologies: readonly string[];
}

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  templateUrl: './tech-stack.html',
  styleUrl: './tech-stack.scss'
})
export class TechStack {
  readonly groups: readonly StackGroup[] = [
    {
      index: '01',
      title: 'Frontend & UI',
      description: 'Interfaces modulares, estado reactivo y experiencias mantenibles.',
      technologies: ['Angular v17–22', 'TypeScript', 'RxJS', 'HTML5', 'SCSS', 'Angular Material']
    },
    {
      index: '02',
      title: 'Backend & APIs',
      description: 'Servicios tipados, lógica de negocio y contratos REST desacoplados.',
      technologies: ['Java', 'Spring Boot', 'Hibernate/JPA', 'Node.js', 'NestJS', 'REST APIs']
    },
    {
      index: '03',
      title: 'Bases de datos & Reporting',
      description: 'Persistencia relacional, modelado de datos y reportes productivos.',
      technologies: ['PostgreSQL', 'SQL Server / MySQL', 'MongoDB', 'Prisma ORM', 'iReport']
    },
    {
      index: '04',
      title: 'Arquitectura & Deploy',
      description: 'Integración continua, builds estáticos y diseño orientado a producto.',
      technologies: ['Git', 'GitHub', 'Prerendering/SSR', 'Vercel', 'Netlify', 'Clean Architecture']
    }
  ];
}
