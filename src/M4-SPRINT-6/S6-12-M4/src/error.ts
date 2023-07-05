export class AppError extends Error {
  public status: number;

  constructor(message: string, status: number = 400) {
    super(message);
    this.status = status;
  }
}
