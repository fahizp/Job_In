import mongoose from 'mongoose';

const signUpSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      sparce: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    location: {
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
    googleId: { type: String, sparse: true, unique: true },
  },
  {
    timestamps: true,
  },
);

const authModel = mongoose.model('Users', signUpSchema);

export default authModel;
