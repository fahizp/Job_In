import mongoose from "mongoose";

const signUpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type:String,
    required:true,
  }
});

export const authModel = mongoose.model("signUp",signUpSchema);


