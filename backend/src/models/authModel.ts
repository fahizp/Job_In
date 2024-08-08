import mongoose from "mongoose";

const signUpSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    googleId: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const authModel = mongoose.model("signUp", signUpSchema);

export default authModel;
