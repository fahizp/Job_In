import express from 'express';
import passport from 'passport';
import {
  loginSuccess,
  loginFailed,
  googleCallback,
} from '../controllers/googleauthController';
import {
  userSignUp,
  userLogin,
  logout,
  protect,
  refreshingToken,
} from '../controllers/authController';
import { tokenVerification } from '../middleWare/tokenVerification';
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login/failed' }),
  googleCallback,
);

router.get('/login/success', loginSuccess);
router.get('/login/failed', loginFailed);
// router.post('/forgot-password',forgotPassword);
// router.post('/reset-password/:id', reset_password);

router.post(
  '/signup',
  body('name', 'Username should be alphanumeric')
    .isLength({ min: 5 })
    .isAlphanumeric(),

  body('email')
    .isEmail()
    .withMessage('Please Enter a valid email address.')
    .normalizeEmail(),

  body('password', 'Password should contain atleast 5 alphanumeric characters.')
    .isLength({ min: 5 })
    .isAlphanumeric(),
  userSignUp,
);
router.post('/login', userLogin);
router.post('/logout', logout);
router.get('/protected', tokenVerification, protect);
router.post('/refreshtoken', refreshingToken);

export default router;
