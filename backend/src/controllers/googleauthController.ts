import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Request, Response } from "express";
import User from "../models/authModel";

const clientUrl = "http://localhost:3000";

// Define the IUser interface
export interface IUser {
  id: string;
  name: string;
  email: string;
  profilePic: string;
  googleId: string;
}

// Passport configuration
passport.use(
  new GoogleStrategy(
    {
      // clientID and clientSecret: These are taken from Google Developer Console. They are used to authenticate the application with Google OAuth 2.0.
      clientID: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      callbackURL: "/auth/google/callback",
    },
    // accessToken: A token that allows access to the user's data.
    // refreshToken: A token that can be used to obtain a new access token.
    // profile: The user's profile information taken from Google.
    // done: A callback function that will be called when authentication is complete.
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          return done(null, user);
        } else {
          // If the user does not exist, a new user object is created with the information from the profile
          const newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            profilePic: profile.photos[0].value,
            googleId: profile.id,
          } as IUser);
          await newUser.save();
          return done(null, newUser);
        }
      } catch (error) {
        console.error("Error during Google authentication:", error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: IUser, done) => {
  done(null, user.id);
});

// user.id is stored in the session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = (await User.findById(id)) as IUser;
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// This function is called when a user successfully logs in
export const loginSuccess = (req: Request, res: Response) => {
  if (req.user) {
    return res.status(200).json({ user: req.user });
  }
  return res.status(404).json({ message: "Not authorized" });
};

// This function is called after the user is authenticated with Google and redirects to clientUrl (3000)
export const googleCallback = (req: Request, res: Response) => {
  res.redirect(clientUrl);
};

// This function is called when login fails
export const loginFailed = (req: Request, res: Response) => {
  return res.status(401).json({ message: "Log in failure" });
};

