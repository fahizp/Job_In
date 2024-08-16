import express from 'express';
import authModel from '../models/authModel';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import { profileInterface } from '../utils/typos';

//updating profile details
export const profileDetails = async (
  req: express.Request,
  res: express.Response,
) => {
  // taking id from req.params
  const userId = req.params.id;

  // taking username and location from req.body
  const { username, location }: profileInterface = req.body;
  try {
    //checking name is exist
    const nameExist = (await authModel.findOne({
      username,
    })) as profileInterface;
    if (nameExist) {
      console.log('username already in use');
      return res.status(409).json({ messaage: 'username already exist' });
    }

    //updating user details
    const updateUserDetails = (await authModel.findByIdAndUpdate(userId, {
      name: username,
      location,
    })) as string;

    //checking user
    if (!updateUserDetails) {
      return res.status(404).json({ message: 'User not found' });
    }

    //sending response
    return res
      .status(200)
      .json({ message: 'Updated successfully', updateUserDetails });
  } catch (error) {
    console.error('Internal server error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

//updating user contact details
export const contactInfo = async (
  req: express.Request,
  res: express.Response,
) => {
  const userId = req.params.id;
  console.log(userId);

  const { mobile, website }: profileInterface = req.body;

  //checking mobile number already exist in db.
  const mobileNumberExist = (await authModel.findOne({
    mobile,
  })) as profileInterface;
  if (mobileNumberExist) {
    console.log('mobile Number already in use');
    return res.status(409).json({ messaage: 'mobile Number already exist' });
  }

  //updating user contact details
  const updateContactDetails = (await authModel.findByIdAndUpdate(userId, {
    website,
    mobile,
  })) as profileInterface;

  //sending response
  return res
    .status(200)
    .json({ message: 'Updated successfully', updateContactDetails });
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
  const { oldPassword, newPassword, conformPassword } : profileInterface = req.body;

  try {
    //taking existing password from authmodel
    const existingPassword = await authModel.findById(userId);

    // password verificaiton
    const verifyPassword  = bcrypt.compare(
      oldPassword,
      existingPassword?.password as string,
    );

    // Check if the password verification failed
    if (!verifyPassword){
      return res.status(401).json({ message: 'Invalid password' });
    } else {
      console.log('password verification successfull');
    }

    // Check if the new password and confirm password are the same
    if (newPassword === conformPassword) {
      console.log({ message: 'newPassword === conformPassword is same' });
    } else {
      return res.status(401).json({ message: 'check new password' });
    }

    //hashing new password
    const hashedpassword = await bcrypt.hash(newPassword, 10);

    //updating new password in authmodel
    const resetPassword = await authModel.findByIdAndUpdate(
      userId,
      {
        hashedpassword,
      },
      { new: true, runValidators: true },
    );

    // Check if the document was not found (resetPassword is null or undefined)
    if (!resetPassword) {
      return res.status(404).json({ message: 'User not found' });
    }

    //sending response
    return res.json('this is taking details');
  } catch (error) {
    console.error('Internal server error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
