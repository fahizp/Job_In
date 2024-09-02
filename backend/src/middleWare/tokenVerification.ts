import jwt from 'jsonwebtoken';
import express from 'express';
import { UserSignUpInterface } from '../utils/typos';

export const tokenVerification = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  //taking token req.headers
  const accessToken = req.headers['x-access-token'] as string;

  //checking token
  const secretKey = process.env.ACCESS_TOKEN;
  if (!secretKey) {
    return res.status(500).json({ message: 'Unauthorized' });
  }
  try {
    //verifying token
    const decoded = jwt.verify(accessToken, secretKey) as UserSignUpInterface;
    req.body.userid = decoded.userId;
    next();
  } catch (error) {
    console.error('unauthorized', error);
    res.status(401).json({ message: 'unauthorized' });
  }
};
