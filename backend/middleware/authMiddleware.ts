import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: any;
}

const { JWT_SECRET } = process.env;

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as any;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
