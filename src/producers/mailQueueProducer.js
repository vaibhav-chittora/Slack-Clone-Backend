import '../processors/mailProcessor.js';

import mailQueue from '../queues/mailQueue.js';
export const addEmailToMailQueue = async (emailData) => {
  console.log('Initiating email service');
  try {
    await mailQueue.add(emailData);
    console.log('Email added to the queue');
  } catch (error) {
    console.log('Error in addEmailToMailQueue', error);
  }
};
