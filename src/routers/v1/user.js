import express from 'express';

import { signUp } from '../../controllers/user.js';
import { validate } from '../../validators/zodValidator.js';
import { userSignUpSchema } from '../../validators/userSchema.js';

const router = express.Router();

router.post('/signup', validate(userSignUpSchema), signUp);

export default router;
