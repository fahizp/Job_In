import express from 'express'
import bcrypt from 'bcrypt'
import authModel  from '../models/authModel';


interface userSignUpInterFace{
    name:string;
    email:string;
    password:string;
}

export const userSignUp= async (req:express.Request,res:express.Response)=>{
const {name,email,password}:userSignUpInterFace  = req.body;

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

 console.log("checking user",newUser)
 await newUser.save();
 return res.status(201).json({message:"created sucessfully"});
}


export const userLogin = async (req:express.Request,res:express.Response)=>{
  const {email,password}:userSignUpInterFace  = req.body;

  try {
    const user =  await authModel.findOne({email})
    if(!user){
      return res.status(404).json({message:"User not found"})
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if(!verifyPassword){
      return res.status(401).json({message:"Invalid password"})
    }

    return res.status(201).json({message:"User login sucessfully"});
    
  } catch (error) {
   return  res.status(500).send("Internal server error");
  }
}