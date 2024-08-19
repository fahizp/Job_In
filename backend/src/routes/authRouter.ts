import express from 'express';
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

router.post(
  '/signup',
  body('name', 'Username should be minimum 6 characters').isLength({ min: 6 }),

  body('email')
    .isEmail()
    .matches(/@gmail\.com$/)
    .withMessage('Please Enter a valid email address.')
    .normalizeEmail(),

  body(
    'password',
    'Password should contain at least 5 alphanumeric characters.',
  )
    .isLength({ min: 5 })
    .isAlphanumeric(),
  userSignUp,
);

router.post('/login', userLogin);
router.post('/logout', logout);
router.get('/protected', tokenVerification, protect);
router.post('/refreshtoken', refreshingToken);

export default router;
