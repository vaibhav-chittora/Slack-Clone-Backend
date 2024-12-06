import { StatusCodes } from 'http-status-codes';

class ValidationError extends Error {
  constructor(errorDetails, message) {
    super(message);
    this.name = 'ValidationError';
    let explaination = [];
    Object.keys(errorDetails.error).forEach((key) => {
      explaination.push(errorDetails.error[key]);
    });
    this.explaination = explaination;
    this.message = message;
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default ValidationError;
