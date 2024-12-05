import express from 'express';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

router.get('/', (req, res) => {
  return res
    .status(StatusCodes.OK)
    .json({ message: 'Hello from v1 Routing Layer' });
});

export default router;
