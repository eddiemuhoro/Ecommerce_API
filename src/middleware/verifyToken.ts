import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Headers missing' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  //decode token using jwt.verify
  try {
    const decoded = jwt.verify(token, 'secret');

    if (typeof decoded !== 'string' && 'id' in decoded && 'email' in decoded) {
      (req as any).user = decoded; // You can define a proper type for this

      next();
    } else {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      // Handle token expiration
      return res
        .status(401)
        .json({ message: 'Token expired. Please log in again.' });
    } else {
      // Other token verification errors
      return res.status(401).json({ message: 'Token verification failed' });
    }
  }
};
