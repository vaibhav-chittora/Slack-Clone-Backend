import { StatusCodes } from 'http-status-codes';

import { signInService, signUpService } from '../services/user.js';
import {
  customErrorResponse,
  internalServerErrorResponse,
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
      .json(internalServerErrorResponse(error));
  }
};

export const signIn = async (req, res) => {
  try {
    const user = await signInService(req.body);
    console.log('User Sign In Details - ', req.body);
    return res
      .status(StatusCodes.OK)
      .json(successResponse(user, 'User Signed in Successfully'));
  } catch (error) {
    console.log('User SignIn Controller Error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};
