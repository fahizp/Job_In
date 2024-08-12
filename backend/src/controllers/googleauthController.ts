import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Request, Response } from "express";
import User from "../models/authModel";
import userTokenModel from "../models/userToken";
import jwt from "jsonwebtoken";

const clientUrl = "http://localhost:3000";

export interface IUser {
  id: string;
  name: string;
  email: string;
  profilePic: string;
  googleId: string;
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      callbackURL: "http://localhost:8001/auth/google/callback", 
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            profilePic: profile.photos[0].value,
            googleId: profile.id,
          } as IUser);

          await user.save();
        }

        const newAccessToken = jwt.sign(
          { userId: user._id },
          process.env.ACCESS_TOKEN as string,
          { expiresIn: process.env.ACCESS_KEY_EXPIRY }
        );

        const newRefreshToken = jwt.sign(
          { userId: user._id },
          process.env.REFRESH_TOKEN as string,
          { expiresIn: process.env.REFRESH_KEY_EXPIRY }
        );

        await userTokenModel.findOneAndDelete({ userId: user._id });
        await new userTokenModel({
          userId: user._id,
          token: newRefreshToken,
        }).save();

        (user as any).accessToken = newAccessToken;
        (user as any).refreshToken = newRefreshToken;

        return done(null, user);
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

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id) as IUser;
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export const loginSuccess = (req: Request, res: Response) => {
  if (req.user) {
    const { accessToken, refreshToken } = req.user as any;
    return res.status(200).json({ user: req.user, accessToken }); // Send access token
  }
  return res.status(404).json({ message: "Not authorized" });
};

export const googleCallback = (req: Request, res: Response) => {
  res.redirect(clientUrl);
};

export const loginFailed = (req: Request, res: Response) => {
  return res.status(401).json({ message: "Log in failure" });
};


