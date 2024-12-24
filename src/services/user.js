import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import userRepository from '../repositories/user.js';
import { createJWT } from '../utils/common/authUtils.js';
import ClientError from '../utils/errors/clientError.js';
import ValidationError from '../utils/errors/validationError.js';

export const signUpService = async (data) => {
  try {
    const newUser = await userRepository.create(data);
    return newUser;
  } catch (error) {
    console.log('User Service Error', error);
    if (error.name === 'ValidationError') {
      throw new ValidationError({ error: error.errors }, error.message);
    }
    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new ValidationError(
        {
          error: ['A user with same email or username already exists.']
        },
        'A User with same email or username already exists.'
      );
    }
  }
};

export const signInService = async (data) => {
  try {
    const user = await userRepository.getByEmail(data.email);
    if (!user) {
      throw new ClientError({
        message: 'No Registered user found with this email',
        status: StatusCodes.NOT_FOUND,
        explanation: 'No Registered user found with this email'
      });
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new ClientError({
        message: 'Invalid password, please try again!!',
        status: StatusCodes.BAD_REQUEST,
        explanation: 'Incorrect Password'
      });
    }

    return {
      username: user.username,
      avatar: user.avatar,
      email: user.email,
      token: createJWT({ id: user._id, email: user.email })
    };
  } catch (error) {
    console.log('User SignIn Service Error', error);

    throw error;
  }
};
