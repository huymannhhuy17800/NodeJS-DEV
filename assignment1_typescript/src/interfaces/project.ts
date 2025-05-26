import { User } from "./user";

export interface Project {
  id: number;
  name: string;
  optionalDescription: string;
  members: User[];
}
