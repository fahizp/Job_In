import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authModel from '../models/authModel';
import userTokenModel from '../models/userToken';
import { validationResult } from 'express-validator';
import { profileInterface, UserSignUpInterface } from '../utils/typos';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
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
      googleId: '',
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
      userId: newUser._id,
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

    console.log('this is user', user.password);

    // password verificaiton
    const verifyPassword = await bcrypt.compare(
      password,
      user.password as string,
    );
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
      userId: user._id,
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

// forget paassword
export const forgetPassword = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    // extracting email from req.body
    const { email } = req.body;

    //checking user
    const user = await authModel.findOne({ email: email });
    //handling user not found
    if (!user) {
      return res.status(409).json('Email not exist');
    }

    // taking token
    let token = await userTokenModel.findOne({ email: email });
    if (!token) {
      token = await new userTokenModel({
        userId: user._id,
        token: crypto.randomBytes(32).toString('hex'),
        expiresAt: new Date(Date.now() + 2 * 60 * 1000),
      }).save();
    }

    //creating link to reset password
    const url = `http://localhost:${process.env.PORT}/password-reset/${user._id}/${token.token}`;

    // Create a transporter object using the nodemailer module
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      // Authentication credentials for the email account
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    const trialEmial = 'akgk75772@gmail.com';
    // Send an email using the transporter object
    const info = await transporter.sendMail({
      //name and address of the sender
      from: process.env.EMAIL,
      // to email taken from env
      to: trialEmial,
      //subject of the email
      subject: 'Password reset',
      //content of the email
      text: url,
    });
    return res.status(200).json({ message: 'Email sent successfully', info });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error });
  }
};

//reset password
export const passwordReset = async (
  req: express.Request,
  res: express.Response,
) => {
  //handling validation error
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ errors: err.array() });
  }
  //taking id from req.params
  const { id, token } = req.params;
  // taking old password , new password and conformPassword from req.body
  const { newPassword, conformPassword }: profileInterface = req.body;

  try {
    // taking token
    let tokenExist = await userTokenModel.findOne({ token: token });
    //token validation
    if (tokenExist && tokenExist.expiresAt > new Date()) {
      console.log('token is valid');
    } else {
      await userTokenModel.deleteOne({ token: token });
      return res.status(400).json('token expired');
    }

    // Check if the new password and confirm password are the same
    if (newPassword === conformPassword) {
      console.log({ message: 'newPassword and conformPassword is equal' });
    } else {
      return res.status(401).json({ message: 'check new password' });
    }
    //hashing new password
    const hashedpassword = await bcrypt.hash(newPassword, 10);
    //updating new password in authmodel
    const resetPassword = await authModel.findByIdAndUpdate(
      id,
      {
        password: hashedpassword,
      },
      { new: true, runValidators: true },
    );
    //delete token after reseting password
    if (tokenExist) {
      await userTokenModel.deleteOne({ token: token });
    }

    // Check if the document was not found (resetPassword is null or undefined)
    if (!resetPassword) {
      return res.status(404).json({ message: 'User not found' });
    }
    //sending response
    return res.status(200).json('Passwowrd reset successful');
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
