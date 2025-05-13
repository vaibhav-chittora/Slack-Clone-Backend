import { APP_LINK,MAIL_ID } from '../../config/serverConfig.js';

export const workspaceJoinMail = function (workspace) {
  return {
    from: MAIL_ID,
    subject: 'You have been  added to the workspace',
    text: `Congratulations! , you are now member of the workspace ${workspace.name}`
  };
};

export const verifyEmailMail = function (verificationToken) {
  return {
    from: MAIL_ID,
    subject: 'Welcome to the app, please verify your email',
    text: `Welcome to the app, please verify your email by clicking on the link below : 
    ${APP_LINK}/verify/${verificationToken}`
  };
};
