import express from 'express'
import bcrypt from 'bcrypt'
import { authModel } from 'src/models/authModel';


interface userSignUpInterFace{
    name:string;
    email:string;
    password:string;
}

export const userSignUp= async (req:express.Request,res:express.Response)=>{
const {name,email,password}:userSignUpInterFace  = req.body;

// checking the email already exist 
const emailExist  =  await authModel.findOne({email})
 if(emailExist){
    console.log("email already in use");
    return res.status(409).json({messaage:"email already exist"})
 }

 const hashedpassword =  await bcrypt.hash(password,10);
 const newUser = new authModel({
   name:name,
   email:email,
   password:hashedpassword
 })

 await newUser.save();
 return res.status(201).json({message:"created sucessfully"});
}

