import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/serverConfig';
import { StatusCodes } from 'http-status-codes';
import {
  customErrorResponse,
  internalServerErrorResponse
} from '../utils/common/responseObjects';
import userRepository from '../repositories/user';

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];

    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          explanation: 'Invalid data sent from the client',
          message: 'Token is required.'
        })
      );
    }

    const response = jwt.verify(token, JWT_SECRET);

    if (!response) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          explanation: 'Invalid data sent from the client',
          message: 'Invalid Token.'
        })
      );
    }

    const user = await userRepository.getById(response.id);
    req.user = user.id;

    next();
  } catch (error) {
    console.log('Error in isAuthenticated middleware', error);
    if (error.name === 'JsonWebTokenError')
      res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          explanation: 'Invalid Data sent from the client',
          message: 'Invalid token provided'
        })
      );

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};
