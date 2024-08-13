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
import { body } from 'express-validator';

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

router.post(
  '/signup',
  body('name', 'Username should be minimum 6 characters')
    .isLength({ min: 6 }),

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
