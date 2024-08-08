import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"; // Changed to import style
import authModel from "../models/authModel";

interface UserSignUpInterface {
  name: string;
  email: string;
  password: string;
}
interface forgotPassword {
  
  email: string;
  
}




export const userSignUp = async (
  req: express.Request,
  res: express.Response
) => {
  const { name, email, password }: UserSignUpInterface = req.body;

  const emailExist = await authModel.findOne({ email });
  if (emailExist) {
    console.log("Email already in use");
    return res.status(409).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new authModel({
    name,
    email,
    password: hashedPassword,
  });

  console.log("Creating new user:", newUser);
  await newUser.save();
  return res.status(201).json({ message: "Created successfully" });
};

export const userLogin = async (
  req: express.Request,
  res: express.Response
) => {
  const { email, password }: UserSignUpInterface = req.body;

  try {
    const user = await authModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send("Internal server error");
  }
};

export const forgotPassword = async (
  req: express.Request,
  res: express.Response
) => {
  const { email }:forgotPassword= req.body;

  try {
    const user = await authModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ status: "User does not exist" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail" as string,
      auth: {
        user: process.env.EMAIL_USER as string,
        pass: process.env.EMAIL_PASS as any,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER as any,
      to: email as string,
      subject: "Password Reset Link" as string,
      text: `Please use the following link to reset your ` as string,
    };

    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).send({ status: "Error", error: error.message });
      }
      return res.send({
        status: "Success" as string,
        message: "Email sent successfully" as string,
        info,
      });
    });
  } catch (error) {
    console.error("Error during forgot password process:", error);
    return res.status(500).send({ status: "Error", error: error.message });
  }
};


// export const reset_password = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { password } = req.body;

//   try {
//     const user = await UserModel.findByIdAndUpdate(id, { password: password });
//     if (!user) {
//       res.status(404).send({ Status: "User not found" });
//       return;
//     }
//     res.send({ Status: "Success" });
//   } catch (error) {
//     console.error('Error updating password:', error);
//     res.status(500).send({ Status: "Error", error: error.message });
//   }
// };

