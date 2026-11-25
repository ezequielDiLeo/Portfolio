import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

interface StackGroup {
  readonly index: string;
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly technologies: readonly string[];
}

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './tech-stack.html',
  styleUrl: './tech-stack.scss'
})
export class TechStack {
  readonly matrixColumns: readonly (readonly string[])[] = [
    [...'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘﾎﾃﾏｹﾒｴｶ'],
    [...'ｷﾑﾕﾗｾﾈｽﾀﾇﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵ'],
    [...'ﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾊﾐﾋｰｳｼ'],
    [...'ﾅﾓﾆｻﾜﾂｵﾘﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽ'],
    [...'ﾀﾇﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘﾎﾃﾏｹﾒ'],
    [...'ｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾊﾐﾋｰｳｼﾅﾓﾆｻ'],
    [...'ﾜﾂｵﾘﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾊﾐ'],
    [...'ﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘﾎﾃﾏｹﾒｴｶｷﾑ'],
    [...'ﾕﾗｾﾈｽﾀﾇﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘ'],
    [...'ﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾊﾐﾋｰｳ'],
    [...'ｼﾅﾓﾆｻﾜﾂｵﾘﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾ'],
    [...'ﾈｽﾀﾇﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘﾎﾃﾏｹ']
  ];

  readonly groups: readonly StackGroup[] = [
    {
      index: '01',
      titleKey: 'STACK_SECTION.FRONTEND_TITLE',
      descriptionKey: 'STACK_SECTION.FRONTEND_DESCRIPTION',
      technologies: ['Angular v17–22', 'TypeScript', 'RxJS', 'HTML5', 'SCSS', 'Angular Material']
    },
    {
      index: '02',
      titleKey: 'STACK_SECTION.BACKEND_TITLE',
      descriptionKey: 'STACK_SECTION.BACKEND_DESCRIPTION',
      technologies: ['Java', 'Spring Boot', 'Hibernate/JPA', 'Node.js', 'NestJS', 'REST APIs']
    },
    {
      index: '03',
      titleKey: 'STACK_SECTION.DATA_TITLE',
      descriptionKey: 'STACK_SECTION.DATA_DESCRIPTION',
      technologies: ['PostgreSQL', 'SQL Server / MySQL', 'MongoDB', 'Prisma ORM', 'iReport']
    },
    {
      index: '04',
      titleKey: 'STACK_SECTION.DEPLOY_TITLE',
      descriptionKey: 'STACK_SECTION.DEPLOY_DESCRIPTION',
      technologies: ['Git', 'GitHub', 'Prerendering/SSR', 'Vercel', 'Netlify', 'Clean Architecture']
    }
  ];
}
