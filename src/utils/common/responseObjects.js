export const successResponse = (data, message) => {
  return {
    success: true,
    data,
    message,
    error: {}
  };
};

export const internalServerErrorResponse = (error) => {
  return {
    success: false,
    error: error.message,
    message: 'Internal Server Error',
    data: {}
  };
};
export const customErrorResponse = (error) => {
  if (!error.statusCode && !error.explaination) {
    return internalServerErrorResponse(error);
  }
  return {
    success: false,
    error: error.explaination,
    message: error.message,
    data: {}
  };
};
