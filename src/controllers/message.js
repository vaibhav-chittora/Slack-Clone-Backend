import { StatusCodes } from 'http-status-codes';
import { getMessagesService } from '../services/message';
import {
  customErrorResponse,
  internalServerErrorResponse,
  successResponse
} from '../utils/common/responseObjects';

export const getMessagesController = async (req, res) => {
  try {
    const response = await getMessagesService(
      {
        channelId: req.params.channelId
      },
      req.query.page || 1,
      req.query.limit || 20
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
