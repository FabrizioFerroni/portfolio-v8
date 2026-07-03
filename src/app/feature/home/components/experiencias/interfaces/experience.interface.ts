export interface ExperienceData {
  id: string;
  company: string;
  position: string;
  startsDate: Date;
  endsDate: Date;
  currentPosition: boolean;
  description: string;
  displayOrder: number;
  skills: string[];
  achievements: string[];
}

export type ExperienceWithPeriod = ExperienceData & { period: string };
