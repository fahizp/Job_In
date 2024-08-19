import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  googleId?: string;
  profilePic?: string;  // Ensure this matches the property name in the schema
}

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
    profilePic: {  // Ensure this is the property name used in the schema
      type: String,
    },
    googleId: { type: String, sparse: true, unique: true },
  },
  {
    timestamps: true,
  },
);

const authModel = mongoose.model<IUser>('Users', signUpSchema);

export default authModel;
