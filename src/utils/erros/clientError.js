import { StatusCodes } from 'http-status-codes';

class ClientError extends Error {
  constructor(error, message) {
    super();
    this.name = 'ClientError';
    this.message = message;
    this.statusCode = error.status ? error.statusCode : StatusCodes.BAD_REQUEST;
    this.explanation = error.explanation || 'Something went wrong';
  }
}

export default ClientError;
