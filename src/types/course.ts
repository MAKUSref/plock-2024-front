import { User, UserBase } from "./user";

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
  participants: Participant[];
}

export interface Participant {
  _id: string;
  user: UserBase;
  attended: boolean;
}
