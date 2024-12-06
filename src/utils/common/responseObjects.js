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
    error: error,
    message: 'Internal Server Error',
    data: {}
  };
};
export const customErrorResponse = (error) => {
  if (!error.message && !error.explaination) {
    return internalServerErrorResponse(error);
  }
  return {
    success: false,
    err: error.explanation,
    message: error.message,
    data: {}
  };
};
