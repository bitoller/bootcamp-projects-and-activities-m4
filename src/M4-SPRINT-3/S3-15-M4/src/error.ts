export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequest extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFound extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class Conflict extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}

export class NoContent extends AppError {
  constructor(message: string) {
    super(message, 204);
  }
}
