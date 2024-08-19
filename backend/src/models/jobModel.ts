import mongoose from 'mongoose';

const jobApplySchema = new mongoose.Schema(
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
    jobTitle: {
      type: String,
    },
    typesOfJobs: {
      type: String,
    },

    description: {
      type: String,
      maxLength: 220,
    },
    phoneNumber: {
      type: Number,
    },
    cv: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const jobApplyModel = mongoose.model('Job applies', jobApplySchema);
export default jobApplyModel;
