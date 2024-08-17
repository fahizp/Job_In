import express from 'express';
import multer from 'multer';
import { body } from 'express-validator';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import {
  contactInfo,
  contactUsPage,
  passwordReset,
  profileDetails,
} from '../controllers/profileController';
const router = express.Router();

//updating profile details and username validation
router.post(
  '/updateDetails/:id',
  upload.single('profilePhoto'),
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
//contact Us page route
router.post(
  '/contactUs/sendemail',
  body('email')
    .isEmail()
    .withMessage('Please Enter a valid email address.')
    .normalizeEmail(),
  contactUsPage,
);

export default router;
