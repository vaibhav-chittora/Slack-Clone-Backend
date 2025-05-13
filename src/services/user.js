import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import { ENABLE_EMAIL_VERIFICATION } from '../config/serverConfig.js';
import { addEmailToMailQueue } from '../producers/mailQueueProducer.js';
import userRepository from '../repositories/user.js';
import { createJWT } from '../utils/common/authUtils.js';
import { verifyEmailMail } from '../utils/common/mailObject.js';
import ClientError from '../utils/errors/clientError.js';
import ValidationError from '../utils/errors/validationError.js';

export const signUpService = async (data) => {
  try {
    const newUser = await userRepository.signUpUser(data);

    if (ENABLE_EMAIL_VERIFICATION === 'true') {
      // send verification email
      addEmailToMailQueue({
        ...verifyEmailMail(newUser.verificationToken),
        to: newUser.email
      });
    }

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
      _id: user._id,
      token: createJWT({ id: user._id, email: user.email })
    };
  } catch (error) {
    console.log('User SignIn Service Error', error);

    throw error;
  }
};

export const verifyTokenService = async (token) => {
  try {
    const user = await userRepository.getByToken(token);
    if (!user) {
      throw new ClientError({
        message: 'Invalid Token',
        explanation: 'Invalid Token',
        status: StatusCodes.BAD_REQUEST
      });
    }
    // check if the verification token is expired or not
    if (user.verificationTokenExpiry < Date.now()) {
      throw new ClientError({
        message: 'Verification Token has Expired',
        explanation: 'Verification Token has Expired',
        status: StatusCodes.BAD_REQUEST
      });
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiry = null;

    await user.save();

    return user;
  } catch (error) {
    console.log('User SignIn Service Error', error);
    throw error;
  }
};
