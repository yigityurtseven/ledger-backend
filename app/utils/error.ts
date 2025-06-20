export class CustomError extends Error {
  statusCode: number | undefined;
  validationErrors?: Array<{
    property: string;
    constraints: { [type: string]: string };
  }>;
}

export const errorHandler = (
  statusCode: number,
  message: string,
  validationErrors?: any[]
) => {
  const error = new CustomError();
  error.statusCode = statusCode;
  error.message = message;
  error.validationErrors = validationErrors;
  return error;
};
