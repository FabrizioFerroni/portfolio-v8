import { ExperienceData } from './experience.interface';

export interface ExperienceState {
  experiences: ExperienceData[];
  isLoading: boolean;
  error: string | null;
  statusCode: number | null;
}
