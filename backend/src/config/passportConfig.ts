import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/googleAuth'; 




passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID || '',
  clientSecret: process.env.CLIENT_SECRET || '',
  callbackURL: '/auth/google/callback',
}, async (_accessToken: string, _refreshToken: string, profile: any, done: Function) => {
  try {
    const user = await User.findOne({ googleId: profile.id });
    if (user) {
      return done(null, user);
    } else {
      const newUser = new User({
        username: profile.displayName,
        email: profile.emails[0].value,
        profilePic: profile.photos[0].value,
        googleId: profile.id,
      });
      await newUser.save();
      return done(null, newUser);
    }
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user: any, done: Function) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done: Function) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
