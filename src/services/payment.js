import crypto from 'crypto';

import { RAZORPAY_KEY_SECRET } from '../config/serverConfig.js';
import paymentRepository from '../repositories/payment.js';

export const createPaymentService = async (orderId, amount) => {
  try {
    const payment = await paymentRepository.create({
      orderId,
      amount
    });
    return payment;
  } catch (error) {
    console.log('Error in createPaymentService', error);
    throw error;
  }
};

export const updatePaymentStatusService = async (
  orderId,
  status,
  paymentId,
  signature
) => {
  try {
    //  first verify the payment is success or not
    if (status === 'success') {
      const shaResponse = crypto
        .createHmac('sha256', RAZORPAY_KEY_SECRET)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');
      console.log('shaResponse', shaResponse, signature);

      if (shaResponse === signature) {
        await paymentRepository.updateOrder(orderId, {
          status: 'success',
          paymentId
        });
      } else {
        // if payment is failed
        throw new Error('Payment verification failed');
      }
    }
  } catch (error) {
    console.log('Error in updatePaymentStatusService', error);
    throw error;
  }
};
