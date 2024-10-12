import { User } from "./user";

export interface Course {
  id: number;
  title: string;
  description: string;
  dateTime: string;
  duration: number;
  tags: string[];
  location: string;
  lecturers: User[];
  files?: string[];
}
