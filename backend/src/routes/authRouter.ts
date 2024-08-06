import express from 'express'
import { userLogin, userSignUp } from '../controllers/authController';
const router = express.Router();


router.post('/signup',userSignUp);
router.post('/login',userLogin)

const authRouter =router
export default authRouter;
