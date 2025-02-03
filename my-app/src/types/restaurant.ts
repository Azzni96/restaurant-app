import { Feedback } from "./feedback";

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  phone: string;
  image?: string;
  feedbacks?: Feedback[]; // Add feedbacks property
}
