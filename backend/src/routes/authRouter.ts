import express from 'express';
import passport from 'passport';
import { loginSuccess, loginFailed, googleCallback} from '../controllers/googleauthController';
import {forgotPassword,userSignUp,userLogin,reset_password} from '../controllers/authController';


const router = express.Router();


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',passport.authenticate('google', { failureRedirect: '/auth/login/failed' }),googleCallback);

router.get('/login/success', loginSuccess);
router.get('/login/failed', loginFailed);
router.post('/forgot-password',forgotPassword);

router.post('/reset-password/:id', reset_password);



router.post('/signup', userSignUp);
router.post('/login', userLogin);

export default router;




