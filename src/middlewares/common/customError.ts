export class CustomError extends Error {
  statusCode?: number;
  status?: number;
  message: string;
  error: string | undefined;

  constructor(statusCode: number, message: string, error?: string) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.error = error || undefined;
  }
}
