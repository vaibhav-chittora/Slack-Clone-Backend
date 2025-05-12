import { StatusCodes } from 'http-status-codes';

import { getMessagesService } from '../services/message.js';
import {
  customErrorResponse,
  internalServerErrorResponse,
  successResponse
} from '../utils/common/responseObjects.js';
import { s3 } from '../config/awsConfig.js';
import { AWS_BUCKET_NAME } from '../config/serverConfig.js';

export const getMessagesController = async (req, res) => {
  try {
    const response = await getMessagesService(
      {
        channelId: req.params.channelId
      },
      req.query.page || 1,
      req.query.limit || 20,
      req.user
    );

    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Messages Fetched Successfully'));
  } catch (error) {
    console.log('Get Messages controller Error', error);

    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};

export const getPreSignedUrlFromAws = async (req, res) => {
  try {
    const url = await s3.getSignedUrlPromise('putObject', {
      Bucket: AWS_BUCKET_NAME,
      Key: `${Data.now()}`,
      Expires: 60 // 1 minute
    });

    return res
      .status(StatusCodes.OK)
      .json(
        successResponse(url, 'Presigned URL fetched successfully from AWS')
      );
  } catch (error) {
    console.log('Error in getPreSignedUrlFromAws', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};
