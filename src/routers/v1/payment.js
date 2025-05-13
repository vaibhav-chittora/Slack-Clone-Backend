import express from 'express';

import {
  capturePaymentController,
  createOrderController
} from '../../controllers/paymentController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/order', isAuthenticated, createOrderController);

// web-hook for capturing/confirming the payment
// this is the endpoint that razorpay will call when the payment is successful
router.post('/capture', capturePaymentController);

export default router;
