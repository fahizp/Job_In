import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import authModel  from '../models/authModel';
import userTokenModel from '../models/userToken';


interface userSignUpInterFace{
    name:string;
    email:string;
    password:string;
}

export const userSignUp= async (req:express.Request,res:express.Response)=>{
const {name,email,password}:userSignUpInterFace  = req.body;

try {
  // checking the email already exist 
const emailExist  =  await authModel.findOne({email})
if(emailExist){
   console.log("email already in use");
   return res.status(409).json({messaage:"email already exist"})
}

// hashing the userpassword
const hashedpassword =  await bcrypt.hash(password,10);
const newUser = new authModel({
  name:name,
  email:email,
  password:hashedpassword
})

await newUser.save();

let accesToken =  jwt.sign({userId:newUser._id},process.env.ACCESS_TOKEN)
let refreshToken =  jwt.sign({userId:newUser._id},process.env.REFRESH_TOKEN)

const userToken = await authModel.findOne({userId:newUser._id});
   if(userToken) await userTokenModel.deleteOne()

   await new userTokenModel({userId:newUser._id,token:refreshToken}).save()
return res.status(201).json({message:"created sucessfully",ACCESS_TOKEN:accesToken,REFRESH_TOKEN:refreshToken});
  
} catch (error) {
  return  res.status(500).send("Internal server error");
}


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

    let accesToken = await jwt.sign({userId:user._id},process.env.ACCESS_TOKEN,{expiresIn:"15m"})
    let refreshToken = await jwt.sign({userId:user._id},process.env.REFRESH_TOKEN,{expiresIn:"6d"})

    const userToken = await userTokenModel.findOne({userId:user._id});
    if(userToken) await userTokenModel.deleteOne()

    await new userTokenModel({userId:user._id,token:refreshToken}).save()

    return res.status(201).json({message:"User login sucessfully",ACCESS_TOKEN:accesToken,REFRESH_TOKEN:refreshToken});
    
  } catch (error) {
   return  res.status(500).send("Internal server error");
  }
}
