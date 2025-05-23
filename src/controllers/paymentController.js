import { StatusCodes } from 'http-status-codes';

import razorpay from '../config/razorpayConfig.js';
import { CURRENCY, RAZORPAY_RECEIPT_SECRET } from '../config/serverConfig.js';
import {
  createPaymentService,
  updatePaymentStatusService
} from '../services/payment.js';
import { internalServerErrorResponse } from '../utils/common/responseObjects.js';

export const createOrderController = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount,
      currency: CURRENCY,
      receipt: RAZORPAY_RECEIPT_SECRET
    };
    const order = await razorpay.orders.create(options);

    await createPaymentService(order.id, order.amount);

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
    const payment = await updatePaymentStatusService(
      req.body.orderId,
      req.body.status,
      req.body.paymentId,
      req.body.signature
    );

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Payment captured successfully',
      data: payment
    });
  } catch (error) {
    console.log('Error in capturePaymentController', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};
