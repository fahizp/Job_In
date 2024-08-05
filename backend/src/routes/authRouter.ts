import express from 'express'
import { userSignUp } from '../controllers/authController';
const router = express.Router();


router.post('/signup',userSignUp);

const authRouter = router;
export default authRouter;
