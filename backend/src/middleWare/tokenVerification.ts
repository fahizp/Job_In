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
  const secretKey = process.env.ACCESS_TOKEN as string;
  if (!secretKey) {
    return res.status(500).json({ message: 'Unauthorized' });
  }
  try {
    //verifying token
    const decoded : any = jwt.verify(
      accessToken as string,
      secretKey,
    ) ;
    req.body.userid = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'unauthorized' });
  }
};
