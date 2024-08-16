import express from 'express';
import { body } from 'express-validator';
import {
  contactInfo,
  passwordReset,
  profileDetails,
} from '../controllers/profileController';
const router = express.Router();


//updating profile details and username validation
router.post(
  '/updateDetails/:id',
  body('username', 'Username should be minimum 6 characters').isLength({
    min: 6,
  }),
  profileDetails,
);

router.post('/ContactInfo/:id', contactInfo);

// reset password and  password validation
router.post(
  '/passwordReset/:id',
  body(
    'newPassword',
    'Password should contain at least 5 alphanumeric characters.',
  )
    .isLength({ min: 5 })
    .isAlphanumeric(),
  passwordReset,
);

export default router;
