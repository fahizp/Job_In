import express from 'express';
import multer from 'multer';
import {
  candidateList,
  candidatePost,
  candidateDetails,
  getInTouch,
} from '../controllers/candidateController';
import { body } from 'express-validator';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  '/submit',
  upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'cv', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  body('timeLine', 'Timeline must be in the format YYYY-YYYY').matches(
    /^\d{4}-\d{4}$/,
  ),

  body(
    'totalExperience',
    'Experience must be in the format "1 Year", where "1" can be any number.',
  ).matches(/^\d+ Year$/ || /^\d+ Years$/),

  body('email', 'Email must end with @gmail.com').matches(/@gmail\.com$/),
  candidatePost,
);
router.get('/candidatelist', candidateList);

router.get('/candidatedetail/:id', candidateDetails);
router.post(
  '/getintouch/:id',
  body('email')
    .isEmail()
    .matches(/@gmail\.com$/)
    .withMessage('Please Enter a valid email address.')
    .normalizeEmail(),
  getInTouch,
);

const candidateRouter = router;
export default candidateRouter;
