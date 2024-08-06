import express from 'express';
import passport from 'passport';
import { userLogin, userSignUp } from '../controllers/authController'; 
import { loginSuccess, loginFailed } from '../controllers/googleauth'; 
const router = express.Router();
const clientUrl = "http://localhost:3000"; 



router.post('/signup', userSignUp);
router.post('/login', userLogin);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/login/failed',
  }),
  (req, res) => {
    res.redirect(clientUrl);
  }
);
router.get('/login/success', loginSuccess);
router.get('/login/failed', loginFailed);



export default router;
