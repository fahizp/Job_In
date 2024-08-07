import express from 'express'
import { logout, protect, refreshingToken, userLogin, userSignUp } from '../controllers/authController';
import { tokenVerification } from '../middleWare/tokenVerification';
const router = express.Router();


router.post('/signup',userSignUp);
router.post('/login',userLogin)
router.post('/logout',logout)
router.get("/protected",tokenVerification,protect);
router.post("/refreshtoken",refreshingToken)


const authRouter =router
export default authRouter;
