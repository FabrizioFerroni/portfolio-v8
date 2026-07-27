export interface TestimonialList {
  id: string;
  comment: string;
  fullname: string;
  position: string;
  empresa: string;
  visible: boolean;
  imageFullUrl: string;
  imageUrl: string;
  project: ProjectTestimonialSummaryDto;
}

export interface ProjectTestimonialSummaryDto {
  id: string;
  title: string;
  summary: string;
  slug: string;
}
