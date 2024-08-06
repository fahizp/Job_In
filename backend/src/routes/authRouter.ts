import express from 'express'
import { logouting, refreshtoken, userLogin, userSignUp } from '../controllers/authController';
const router = express.Router();


router.post('/signup',userSignUp);
router.post('/login',userLogin)
router.post('/refreshtoken',refreshtoken)
router.post('/logout',logouting)

const authRouter =router
export default authRouter;
