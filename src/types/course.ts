import { User } from "./user";

export interface Course {
  _id: string;
  title: string;
  description: string;
  dateTime: string;
  duration: number;
  tags: string[];
  location: string;
  lecturers: User[];
  files?: string[];
  coverImgSrc: string;
}
