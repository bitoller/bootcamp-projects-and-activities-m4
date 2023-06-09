import format from "pg-format";
import { client } from "../database";
import {
  IDeveloper,
  IDeveloperInfos,
  TDeveloper,
  TDeveloperInfos,
  TDeveloperUpdate,
} from "../interfaces/developers.interfaces";

export const createDeveloper = async (
  payload: TDeveloper
): Promise<IDeveloper> => {
  const queryFormat = format(
    `INSERT INTO developers (%I) VALUES (%L) RETURNING *;`,
    Object.keys(payload),
    Object.values(payload)
  );
  const queryResult = await client.query(queryFormat);

  return queryResult.rows[0];
};

export const createDeveloperInfos = async (
  payload: TDeveloperInfos,
  developerId: string
): Promise<IDeveloperInfos> => {
  const queryFormat = format(
    `INSERT INTO "developerInfos" (%I, "developerId") VALUES (%L, $1) RETURNING *;`,
    Object.keys(payload),
    Object.values(payload)
  );
  const queryResult = await client.query(queryFormat, [developerId]);

  return queryResult.rows[0];
};

export const readDeveloper = async (
  developerId: string
): Promise<IDeveloper> => {
  const queryFormat = format(
    `SELECT
    dev.id AS "developerId",
    dev.name AS "developerName", 
    dev.email AS "developerEmail", 
    infos."developerSince" AS "developerInfoDeveloperSince", 
    infos."preferredOS" AS "developerInfoPreferredOS"
    FROM
    developers AS "dev"
    LEFT JOIN
    "developerInfos" AS infos ON infos."developerId" = dev.id
    WHERE
    dev.id = $1;`
  );
  const queryResult = await client.query(queryFormat, [developerId]);

  return queryResult.rows[0];
};

export const updateDeveloper = async (
  payload: TDeveloperUpdate,
  developerId: string
): Promise<IDeveloper> => {
  const queryFormat = format(
    `UPDATE developers SET (%I) = ROW (%L) WHERE id = $1 RETURNING *;`,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult = await client.query(queryFormat, [developerId]);

  return queryResult.rows[0];
};

export const destroyDeveloper = async (developerId: string): Promise<void> => {
  const queryResult = await client.query(
    `DELETE FROM developers WHERE id = $1;`,
    [developerId]
  );
};
