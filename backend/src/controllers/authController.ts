import express from "express";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";
import authModel from "../models/authModel";
import userTokenModel from "../models/userToken";

interface userSignUpInterFace {
  name: string;
  email: string;
  password: string;
}
interface forgotPassword {
  
  email: string;
  
}


// userSignUp 
export const userSignUp = async (
  req: express.Request,
  res: express.Response
) => {
  const { name, email, password }: userSignUpInterFace = req.body;

  try {
    // checking the email already exist
    const emailExist = await authModel.findOne({ email });
    if (emailExist) {
      console.log("email already in use");
      return res.status(409).json({ messaage: "email already exist" });
    }

    // hashing the userpassword
    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = new authModel({
      name: name,
      email: email,
      password: hashedpassword,
    });

    // saving newUser 
     await newUser.save();

    //generating access token and refresh tokem
    let accesToken: string = jwt.sign(
      { userid:newUser._id },
      process.env.ACCESS_TOKEN,{
        expiresIn:process.env.ACCESS_KEY_EXPIRY
      }
    );
    let refreshToken: string = jwt.sign(
      { userid:newUser._id },
      process.env.REFRESH_TOKEN,{
        expiresIn:process.env.REFRESH_KEY_EXPIRY
      }
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
      message: "created sucessfully",
      ACCESS_TOKEN: accesToken,
      REFRESH_TOKEN: refreshToken,
    });
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
};


// userLogin
export const userLogin = async (
  req: express.Request,
  res: express.Response
) => {
  const { email, password }: userSignUpInterFace = req.body;

  try {

    // checking the user 
    const user: any = await authModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // password verificaiton
    const verifyPassword: any = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

     //generating access token and refresh tokem
    let accesToken: String = await jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN as string,
      { expiresIn: process.env.ACCESS_KEY_EXPIRY }
    );
    let refreshToken: String = await jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN as string,
      { expiresIn:process.env.REFRESH_KEY_EXPIRY }
    );

    // deleting the user if already exist in userTokenModel 
    const userToken: String = await userTokenModel.findOne({
      userId: user._id,
    });
    if (userToken) await userTokenModel.deleteOne();

    //storing refresh token to userTokenModel
    await new userTokenModel({ userId: user._id, token: refreshToken }).save();

    return res.status(201).json({
      message: "User login sucessfully",
      ACCESS_TOKEN: accesToken,
      REFRESH_TOKEN: refreshToken,
    });
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
};


//  this for testing protected using tokencverification middleware
export const protect = async (req: express.Request, res: express.Response) => {
  const id =req.body.userid;
  const userdata = await authModel.findById(id);
  res.json({ user: userdata });
};


// refresh Token 
export const refreshingToken = async (req: express.Request, res: express.Response) => {
  const { refresh_token } = req.body;
  if (!refresh_token) {
    return res.status(400).json({ message: "Missing refresh token" });
  }

  try {
    //token verifying
    const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN as string) as { userId: string };
    const userId = decoded.userId;
    // taken token from db (userTokenModel) using verified token userId
    const refreshToken = await userTokenModel.find({ token: refresh_token });
    
    //checking token 
    if (!refreshToken.length) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    //generating new accestoken 
    const newAccessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN as string, { expiresIn: process.env.ACCESS_KEY_EXPIRY })
    return res.json({ accessToken: newAccessToken })
    
  } catch (error) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
}

// LogOut
export const logout = async (
  req: express.Request,
  res: express.Response
) => {
  const { refresh_token } = req.body;
  // checking refresh token
  if (!refresh_token) return res.status(401).send("Refresh Token Required");
  try {

    //deleting token from  db (userTokenModel)
    await userTokenModel.deleteOne({ token: refresh_token });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
