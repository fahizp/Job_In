import mongoose from 'mongoose';

const signUpSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      sparce: true,
      unique:true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    occupation: {
      type: String,
    },
    website: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    profilePhoto: {
      type: String,
      default: 'https://jobinproject.s3.ap-south-1.amazonaws.com/Classic.jpeg',
    },
    refreshToken:{
      type:String
    },
    banner: {
      type: String,
      default: 'https://jobinproject.s3.ap-south-1.amazonaws.com/default+banner.jpeg'
    },
    googleId: { type: String, sparse: true},
   
  },
  {
    timestamps: true,
  },
);

const authModel = mongoose.model('Users', signUpSchema);

export default authModel;
