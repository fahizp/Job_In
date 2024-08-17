import express from 'express';
import multer from 'multer';
import {
  candidateList,
  candidatePost,
} from '../controllers/candidateController';

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
  candidatePost,
);
router.get('/candidatelist', candidateList);

const candidateRouter = router;
export default candidateRouter;
