import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import errorHandler from '../utils/errorHandler';

const { JWT_SECRET } = process.env;

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.createUser(username, hashedPassword);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error: any) {
    errorHandler(res, error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET!, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error: any) { // Ensure 'error' is of type 'any'
    errorHandler(res, error);
  }
};
