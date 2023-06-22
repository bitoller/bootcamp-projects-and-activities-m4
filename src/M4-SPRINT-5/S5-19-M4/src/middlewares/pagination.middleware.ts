import { NextFunction, Request, Response } from "express";

export const pagination = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const queryPage: number = Number(request.query.page);
  const queryPerPage: number = Number(request.query.perPage);

  const page: number = queryPage && queryPage > 1 ? queryPage : 1;
  const perPage: number =
    queryPerPage && queryPerPage <= 5 && queryPerPage > 0 ? queryPerPage : 5;

  const querySort: any = request.query.sort;
  const queryOrder: any = request.query.order;
  
  const orderOptions: Array<string> = ["asc", "desc"];
  const sortOptions: Array<string> = ["price", "duration"];

  let sort: string;
  let order: string;

  if (!(querySort && sortOptions.includes(querySort))) {
    sort = "id";
  } else {
    sort = querySort;
  }

  if (!querySort || !(queryOrder && orderOptions.includes(queryOrder))) {
    order = "asc";
  } else {
    order = queryOrder;
  }

  const baseUrl: string = "http://localhost:3000/movies";
  const prevPage: string = `${baseUrl}?page=${page - 1}&perPage=${perPage}`;
  const nextPage: string = `${baseUrl}?page=${page + 1}&perPage=${perPage}`;

  response.locals = {
    ...response.locals,
    pagination: {
      page: perPage * (page - 1),
      perPage,
      order,
      sort,
      prevPage,
      nextPage,
    },
  };

  return next();
};
