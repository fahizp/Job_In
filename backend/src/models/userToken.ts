import mongoose, { Schema } from 'mongoose';

const userTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  token: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30 * 86400, //30 days
  },
});

const userTokenModel = mongoose.model('UserToken', userTokenSchema);
export default userTokenModel;
