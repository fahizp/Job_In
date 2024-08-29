import express from 'express';
import multer from 'multer';
import { body } from 'express-validator';
import {
  jobApply,
  jobDetails,
  jobList,
  jobPost,
  jobSearch,
} from '../controllers/jobController';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

// job apply and email validation
router.post(
  '/jobapply/:jobId/:userId',
  upload.single('cv'),
  body('email')
    .isEmail()
    .matches(/@gmail\.com$/)
    .withMessage('Please Enter a valid email address.')
    .normalizeEmail(),
  jobApply,
);

//job list
router.get('/joblist', jobList);

//job details
router.get('/jobdetails/:id', jobDetails);

//job search bar
router.get('/jobsearch', jobSearch);

//job post
router.post('/jobpost', upload.single('logo'), jobPost);

export default router;
