import { StatusCodes } from 'http-status-codes';

import razorpay from '../config/razorpayConfig.js';
import { CURRENCY, RAZORPAY_RECEIPT_SECRET } from '../config/serverConfig.js';
import { internalServerErrorResponse } from '../utils/common/responseObjects.js';

export const createOrderController = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount,
      currency: CURRENCY,
      receipt: RAZORPAY_RECEIPT_SECRET
    };
    const order = await razorpay.orders.create(options);

    if (!order) {
      throw new Error('Failed to create order');
    }
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    console.log('Error in createOrderController', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};

export const capturePaymentController = async (req, res) => {
  try {
    console.log('Capture payment Request Body - ', req.body);
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Payment captured successfully'
    });
  } catch (error) {
    console.log('Error in capturePaymentController', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};
