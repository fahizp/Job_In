import express from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import authModel from '../models/authModel';
import userToken from '../models/userToken';
import dotenv from 'dotenv';

dotenv.config();

export const googleAuth = async (req: express.Request, res: express.Response) => {
  const { token } = req.body;

  try {
    const googleResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);
    const { email, sub: googleId, picture, given_name, family_name } = googleResponse.data;

    let user = await authModel.findOne({ email });

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        user.name = `${given_name} ${family_name}`;
        user.profilePhoto = picture;
        await user.save();
      }




    } else {
      user = new authModel({
           name: `${given_name} ${family_name}`,
        email,
        googleId,
        profilePhoto: picture,
        password: '',
      });
      await user.save();
    }

    const accessToken = jwt.sign(
        { userId: user._id },
      process.env.ACCESS_TOKEN!,
         { expiresIn: process.env.ACCESS_KEY_EXPIRY }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN!,
      { expiresIn: process.env.REFRESH_KEY_EXPIRY }
    );

    await userToken.findOneAndUpdate(
      { userId: user._id },
      { token: refreshToken },
      { upsert: true }
    );

    return res.status(200).json({
      accessToken,refreshToken,
      profilePic: user.profilePhoto, 
      name: user.name,email: user.email,
    });
  } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
               console.error('Error verifying token with Google:', error.message);
          } else if (error instanceof Error) {
               console.error('Error authenticating with Google:', error.message);
          } else {
               console.error('Unknown error occurred during Google authentication');
          }
          return res.status(500).json({ message: 'Internal server error' });
  }
};
