import { StatusCodes } from 'http-status-codes';

import { signUpService } from '../services/user.js';
import {
  customErrorResponse,
  successResponse
} from '../utils/common/responseObjects.js';

export const signUp = async (req, res) => {
  try {
    const newUser = await signUpService(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(newUser, 'User Created Successfully'));
  } catch (error) {
    console.log('User Controller Error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(customErrorResponse(error));
  }
};
