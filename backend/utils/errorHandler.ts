import { Response } from 'express';

const errorHandler = (res: Response, error: Error) => {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
