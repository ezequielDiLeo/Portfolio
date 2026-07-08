export interface Project {
  id: string;
  codename: string;
  title: string;
  status: ProjectStatus;
  year: string;
  description: string;
  details: string;
  stack: string[];
  image: string | null;
  link?: string;
}

export type ProjectStatus =
  | 'DEPLOYED'
  | 'ACTIVE'
  | 'IN PROGRESS'
  | 'CLASSIFIED';

export interface LogLine {
  text: string;
  type: LogLineType;
  visible: boolean;
}

export type LogLineType =
  | 'system'
  | 'ok'
  | 'data'
  | 'warn';

export interface SkillNode {
  id: string;
  label: string;
  category: SkillCategory;
  level: number;
  icon: string;
  angle: number;
  /**
   * Factor de radio
   * 0 = centro
   * 1 = borde del sistema
   */
  radius?: number;
}

export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'tools';


export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  desc: string;
}
