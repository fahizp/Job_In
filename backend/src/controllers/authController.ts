import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authModel from '../models/authModel';
import userTokenModel from '../models/userToken';
import { validationResult } from 'express-validator';
import { UserSignUpInterface } from '../utils/typos';
import dotenv from 'dotenv';
dotenv.config();

// userSignUp
export const userSignUp = async (
  req: express.Request,
  res: express.Response,
) => {
  const { name, email, password }: UserSignUpInterface = req.body;

  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ errors: err.array() });
  }

  try {
    // checking the email already exist
    const emailExist = await authModel.findOne({ email });
    if (emailExist) {
      console.log('email already in use');
      return res.status(409).json({ messaage: 'email already exist' });
    }

    // hashing the userpassword
    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = new authModel({
      name,
      email,
      password: hashedpassword,
      googleId: null,
    });

    // saving newUser
    try {
      await newUser.save();
      console.log('User saved successfully');
    } catch (error) {
      console.error('Error saving user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    //generating access token and refresh tokem
    const accesToken: string = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN as string,
      {
        expiresIn: process.env.ACCESS_KEY_EXPIRY,
      },
    );
    const refreshToken: string = jwt.sign(
      { userId: newUser._id },
      process.env.REFRESH_TOKEN as string,
      {
        expiresIn: process.env.REFRESH_KEY_EXPIRY,
      },
    );

    // deleting the user if already exist in userTokenModel
    const userToken = await authModel.findOne({ userId: newUser._id });
    if (userToken) await userTokenModel.deleteOne();

    //storing refresh token to userTokenModel
    await new userTokenModel({
      userId: newUser._id,
      token: refreshToken,
    }).save();
    return res.status(201).json({
      message: 'created sucessfully',
      ACCESS_TOKEN: accesToken,
      REFRESH_TOKEN: refreshToken,
    });
  } catch (error) {
    console.error('Internal server error:', error);
    return res.status(500).json('Internal server error');
  }
};

// userLogin
export const userLogin = async (
  req: express.Request,
  res: express.Response,
) => {
  const { email, password }: UserSignUpInterface = req.body;

  try {
    // checking the user
    const user = await authModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // password verificaiton
    const verifyPassword = bcrypt.compare(password, user.password as string);
    if (!verifyPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    //generating access token and refresh tokem
    const accesToken: string = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN as string,
      { expiresIn: process.env.ACCESS_KEY_EXPIRY },
    );
    const refreshToken: string = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN as string,
      { expiresIn: process.env.REFRESH_KEY_EXPIRY },
    );

    // deleting the user if already exist in userTokenModel
    const userToken = await userTokenModel.findOne({
      userId: user._id,
    });
    if (userToken) await userTokenModel.deleteOne({ userId: user._id });

    //storing refresh token to userTokenModel
    await new userTokenModel({ userId: user._id, token: refreshToken }).save();

    return res.status(201).json({
      message: 'User login sucessfully',
      ACCESS_TOKEN: accesToken,
      REFRESH_TOKEN: refreshToken,
    });
  } catch (error) {
    console.error('Internal server error:', error);
    return res.status(500).send('Internal server error');
  }
};

//  this for testing protected using tokencverification middleware
export const protect = async (req: express.Request, res: express.Response) => {
  const id = req.body.userid;
  const userdata = await authModel.findById(id);
  res.json({ user: userdata });
};

// refresh Token
export const refreshingToken = async (
  req: express.Request,
  res: express.Response,
) => {
  const { refresh_token } = req.body;
  if (!refresh_token) {
    return res.status(400).json({ message: 'Missing refresh token' });
  }

  try {
    //token verifying
    const decoded = jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN as string,
    ) as UserSignUpInterface;
    const userId = decoded.userId;
    // taken token from db (userTokenModel) using verified token userId
    const refreshToken = await userTokenModel.find({ token: refresh_token });

    //checking token
    if (!refreshToken.length) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    //generating new accestoken
    const newAccessToken = jwt.sign(
      { userId },
      process.env.ACCESS_TOKEN as string,
      { expiresIn: process.env.ACCESS_KEY_EXPIRY },
    );

    return res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error('Invalid refresh token:', error);
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
};

// LogOut
export const logout = async (req: express.Request, res: express.Response) => {
  const { refresh_token } = req.body;
  // checking refresh token
  if (!refresh_token) return res.status(401).send('Refresh Token Required');
  try {
    //deleting token from  db (userTokenModel)
    await userTokenModel.deleteOne({ token: refresh_token });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

