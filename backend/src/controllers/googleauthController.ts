import express from 'express';

export const loginSuccess = (req: express.Request, res: express.Response) => {
  if (req.user) {
    return res.status(200).json({ user: req.user });
  }
  return res.status(404).json({ message: 'Not authorized' });
};

export const loginFailed = (req: express.Request, res: express.Response) => {
  return res.status(401).json({ message: 'Log in failure' });
};
