import { QueryResult } from "pg";

export interface IProject {
  id: number;
  name: string;
  description: string;
  repository: string;
  startedDate: Date;
  endDate: Date;
  developerId: number;
}

export interface Project {
  projectId: number;
  projectName: string;
  projectDescription: string;
  projectRepository: string;
  projectStartDate: Date;
  projectEndDate: Date;
  projectDeveloperName: string;
}

export type TProject = Omit<IProject, "id">;
export type TProjectUpdate = Partial<TProject>;
export type TProjectResult = QueryResult<IProject>;
