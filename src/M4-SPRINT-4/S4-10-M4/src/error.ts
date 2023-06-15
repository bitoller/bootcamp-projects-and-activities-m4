export class AppError extends Error {
  public status: number;

  constructor(public message: string, status: number) {
    super(message);
    this.status = status;
  }
}
