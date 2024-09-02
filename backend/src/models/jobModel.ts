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
    },
    experience: {
      type: String,
    },
    coverLetter: {
      type: String,
      maxLength: 220,
    },
    phoneNumber: {
      type: Number,
    },
    cv: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const jobApplyModel = mongoose.model('jobApplies', jobApplySchema);

const jobPostSchema = new mongoose.Schema(
  {
    logo: {
      type: String,
      default: 'https://jobinproject.s3.ap-south-1.amazonaws.com/Classic.jpeg',
    },

    title: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    jobCategory: {
      type: String,
      required: true,
    },
    minSalary: {
      type: String,
      require: true,
    },
    maxSalary: {
      type: String,
      require: true,
    },
    experience: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    responsibilities: {
      type: String,
      maxLength: 800,
    },
    description: {
      type: String,
      required: true,
      maxLength: 800,
    },
    Requireds: {
      type: String,
      maxLength: 800,
    },
    postedDate: {
      type: Number,
      default: Date.now,
    },
    status: {
      type: String,
    },
    appliedUsersId:{
      type:[String]
    }
  },
  {
    timestamps: true,
  },
);

export const jobPostModel = mongoose.model('jobs', jobPostSchema);
