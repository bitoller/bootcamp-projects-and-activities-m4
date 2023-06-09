import { QueryResult } from "pg";

export interface IDeveloper {
  id: number;
  name: string;
  email: string;
}

export interface IDeveloperInfos {
  id: number;
  developerSince: string;
  preferredOS: "Windows" | "Linux" | "MacOS";
  developerId: number;
}

export type TDeveloper = Omit<IDeveloper, "id">;
export type TDeveloperUpdate = Partial<TDeveloper>;
export type TDeveloperResult = QueryResult<IDeveloper>;

export type TDeveloperInfos = Omit<IDeveloperInfos, "id">;
export type TDeveloperInfosUpdate = Partial<TDeveloperInfos>;
export type TDeveloperInfosResult = QueryResult<IDeveloperInfos>;
