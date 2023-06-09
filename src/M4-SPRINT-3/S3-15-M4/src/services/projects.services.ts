import format from "pg-format";
import { client } from "../database";
import {
  IProject,
  Project,
  TProject,
  TProjectUpdate,
} from "../interfaces/projects.interfaces";

export const readProjectById = async (id: string): Promise<Project> => {
  const queryResult = await client.query(
    `SELECT
    pj.id AS "projectId",
    pj.name AS "projectName",
    pj.description AS "projectDescription",
    pj.repository AS "projectRepository",
    pj."startDate" AS "projectStartDate",
    pj."endDate" AS "projectEndDate",
    dev.name AS "projectDeveloperName"
    FROM
    projects AS pj
    LEFT JOIN
    developers AS dev ON dev.id = pj."developerId"
    WHERE 
    pj.id = $1;`,
    [id]
  );

  return queryResult.rows[0];
};

export const createProject = async (payload: TProject): Promise<IProject> => {
  const queryFormat = format(
    `INSERT INTO projects (%I) VALUES (%L) RETURNING *;`,
    Object.keys(payload),
    Object.values(payload)
  );
  const queryResult = await client.query(queryFormat);

  return queryResult.rows[0];
};

export const updateProject = async (
  payload: TProjectUpdate,
  id: string
): Promise<IProject> => {
  const queryFormat = format(
    `UPDATE projects SET (%I) = ROW (%L) WHERE id = $1 RETURNING *;`,
    Object.keys(payload),
    Object.values(payload)
  );
  const queryResult = await client.query(queryFormat, [id]);

  return queryResult.rows[0];
};
