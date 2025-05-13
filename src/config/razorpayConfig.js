import Razorpay from 'razorpay';

import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from './serverConfig.js';

const instance = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET
});

export default instance;
