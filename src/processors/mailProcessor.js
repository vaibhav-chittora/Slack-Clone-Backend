import mailer from '../config/mailConfig.js';
import mailQueue from '../queues/mailQueue.js';
mailQueue.process(async (job) => {
  const emailData = job.data;
  console.log('Processing email', emailData);
  try {
    const response = await mailer.sendMail(emailData);
    console.log('email Sent successfully', response);
  } catch (error) {
    console.log('Error in Mail Processor - ', error);
  }
});
