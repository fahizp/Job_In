import express from 'express';
import authModel from '../models/authModel';
import bcrypt from 'bcrypt';

import { validationResult } from 'express-validator';
import { profileInterface } from '../utils/typos';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import nodemailer from 'nodemailer';

// Retrieve and cast environment variables for S3 bucket configuration
const bucketName = process.env.BUCKET_NAME as string;
const bucketRegion = process.env.BUCKET_REGION as string;
const s3AccessKey = process.env.S3_ACCESS_KEY as string;
const s3SecretAccessKey = process.env.S3_SECRET_ACCESS_KEY as string;

//configuring an AWS S3 client
const s3 = new S3Client({
  credentials: {
    accessKeyId: s3AccessKey,
    secretAccessKey: s3SecretAccessKey,
  },
  region: bucketRegion,
});

//updating personaldetails
export const profileDetails = async (
  req: express.Request,
  res: express.Response,
) => {
  // taking id from req.params
  const userId = req.params.id;

  // taking username and location from req.body
  const { username, occupation, mobile }: profileInterface = req.body;
  //Retrieve the uploaded file from the request object.
  const { profilePhoto, banner }: any = req.files;

  try {
    const test = await authModel.findById(userId);
    console.log('this ', test);

    //checking name is exist
    if (username) {
      const nameExist = await authModel.find({ _id: userId, name: username });

      if (nameExist.length > 0) {
        console.log('username already in use');
        return res.status(409).json({ messaage: 'username already exist' });
      }
    }

    //checking mobile number already exist in db.
    if (mobile) {
      const mobileNumberExist = (await authModel.findOne({
        mobile,
      })) as profileInterface;
      if (mobileNumberExist) {
        console.log('mobile Number already in use');
        return res
          .status(409)
          .json({ messaage: 'mobile Number already exist' });
      }
    }

    // Upload Profile Photo
    let uploadProfilePhoto;
    if (profilePhoto) {
      const profilePhotoParams = {
        Bucket: bucketName,
        Key: `profile-photos/${profilePhoto[0].originalname}`,
        Body: profilePhoto[0].buffer,
        ContentType: profilePhoto[0].mimetype,
      };
      const profilePhotoCommand = new PutObjectCommand(profilePhotoParams);
      uploadProfilePhoto = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/profile-photos/${profilePhoto[0].originalname}`;
      await s3.send(profilePhotoCommand);
    }

    // Upload Banner
    let uploadBanner;
    if (banner) {
      const bannerParams = {
        Bucket: bucketName,
        Key: `banners/${banner[0].originalname}`,
        Body: banner[0].buffer,
        ContentType: banner[0].mimetype,
      };
      uploadBanner = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/banners/${banner[0].originalname}`;
      const bannerCommand = new PutObjectCommand(bannerParams);
      await s3.send(bannerCommand);
    }

    //updating user details
    const updateUserDetails = (await authModel.findByIdAndUpdate(userId, {
      name: username,
      occupation,
      profilePhoto: uploadProfilePhoto,
      banner: uploadBanner,
      mobile,
    })) as string;

    const Finaltest = await authModel.findById(userId);

    //checking user
    if (!updateUserDetails) {
      return res.status(404).json({ message: 'User not found' });
    }

    //sending response
    return res.status(200).json({ message: 'Updated successfully', Finaltest });
  } catch (error) {
    console.error('Internal server error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

//reseting password
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
  const userId = req.params.id;

  // taking old password , new password and conformPassword from req.body
  const { oldPassword, newPassword, conformPassword }: profileInterface =
    req.body;

  try {
    //taking existing password from authmodel
    const existingPassword = await authModel.findById(userId);

    // password verificaiton
    const verifyPassword = await bcrypt.compare(
      oldPassword,
      existingPassword?.password as string,
    );

    // Check if the password verification failed
    if (!verifyPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    } else {
      console.log('password verification successfull');
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
      userId,
      {
        password: hashedpassword,
      },
      { new: true, runValidators: true },
    );

    // Check if the document was not found (resetPassword is null or undefined)
    if (!resetPassword) {
      return res.status(404).json({ message: 'User not found' });
    }

    //sending response
    return res.status(200).json('Passwowrd reset successful');
  } catch (error) {
    console.error('Internal server error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

//Contact us page
export const contactUsPage = async (
  req: express.Request,
  res: express.Response,
) => {
  // taking yourname,email,subject,message from req.body
  const { yourname, email, subject, message }: profileInterface = req.body;

  try {
    // Create a transporter object using the nodemailer module
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      // Authentication credentials for the email account
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    // Send an email using the transporter object
    const info = await transporter.sendMail({
      from: { name: yourname, address: email },
      //name and address of the sender
      replyTo: `<${email}>`,
      // to email taken from env
      to: process.env.EMAIL,
      //subject of the email
      subject: subject,
      //content of the email
      text: message,
    });
    return res.status(200).json({ message: 'Email sent successfully', info });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error });
  }
};

// delete account
export const deleteAccount = async (
  req: express.Request,
  res: express.Response,
) => {
  //taking id from req.params
  const userId = req.params.id;

  try {
    //deleting user from authmodel
    const user = await authModel.findByIdAndDelete({ _id: userId });

    //handling user not found situation
    if (!user) {
      return res.status(404).json('user not found');
    }

    // deleting profile photo from s3 bucket
    const params = {
      Bucket: bucketName,
      Key: user.profilePhoto,
    };
    const command = new DeleteObjectCommand(params);
    try {
      await s3.send(command);
      console.log('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file:', error);
    }

    //sending response
    return res.status(200).json('Account deleted ');
  } catch (error) {
    console.error('Internal server error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

//feteching profile details
export const userDetails = async (
  req: express.Request,
  res: express.Response,
) => {
  //taking id from req.params
  const userId = req.params.id;

  try {
    //fetching user from authmodel
    const user = await authModel.findById(userId, {
      name: 1,
      profilePhoto: 1,
      banner: 1,
      occupation: 1,
      mobile: 1,
      website: 1,
    });

    //handling user not found situation
    if (!user) {
      return res.status(404).json('user not found');
    }

    //sending response
    return res.status(200).json({ 'user details': user });
  } catch (error) {
    console.error('Internal server error:', error);

    return res.status(500).json({ message: 'Internal server error' });
  }
};
