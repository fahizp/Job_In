import express from 'express';
import multer from 'multer';
import { body } from 'express-validator';
import { jobApply, jobDetails, jobList, jobSearch } from '../controllers/jobController';

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

  //job list
  router.get('/joblist',jobList)

  //job details
  router.get('/jobdetails/:id',jobDetails);

  //job search bar 
  router.get('/jobsearch',jobSearch)

  export default router;