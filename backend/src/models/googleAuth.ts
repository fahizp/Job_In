import mongoose from 'mongoose';

const GoogleSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  profilePic: { type: String },
  googleId: { type: String, required: true, unique: true },
  disabled: { type: Boolean, default: false },
});

const Google = mongoose.model('googleAuth', GoogleSchema);
export default Google;
