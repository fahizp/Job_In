import express from 'express';
import passport from 'passport';
import { loginSuccess, loginFailed, googleCallback} from '../controllers/googleauthController';
import {userSignUp,userLogin, logout} from '../controllers/authController';
import {tokenVerification} from "../middleWare/tokenVerification"


const router = express.Router();


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',passport.authenticate('google', { failureRedirect: '/auth/login/failed' }),googleCallback);

router.get('/login/success', loginSuccess);
router.get('/login/failed', loginFailed);




router.post('/signup', userSignUp);
router.post('/login', userLogin);
router.post("/logout", tokenVerification, logout);

export default router;




