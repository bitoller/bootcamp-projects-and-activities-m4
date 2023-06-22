import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validateBody =
  (schema: z.ZodTypeAny) =>
  (request: Request, response: Response, next: NextFunction): void => {
    const validated = schema.parse(request.body);
    response.locals = { ...response.locals, validated };

    return next();
  };
