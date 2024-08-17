import express from 'express';
import multer from 'multer';
import { body } from 'express-validator';
import { jobApply } from '../controllers/jobController';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

//updating profile details and username validation
router.post(
    '/jobapply/:id',
    upload.single('cv'),
    body('email')
    .isEmail()
    .withMessage('Please Enter a valid email address.')
    .normalizeEmail(),
    jobApply,
  );

  export default router;