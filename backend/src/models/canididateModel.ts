import mongoose from 'mongoose';

//define a sub-schema for the object in the array
const experienceSchema = new mongoose.Schema({
  role: {
    type: String,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
    maxLength: 220,
  },
  timeLine: {
    type: String,
  },
  logo: {
    type: String,
  },
  salary:{
    type:String
  }
  ,companyName:{
    type:String,
  }
});

// Define the main schema with the array field using the sub-schema
const candidateSchema = new mongoose.Schema(
  {
    profilePhoto: {
      type: String,
      default: 'https://jobinproject.s3.ap-south-1.amazonaws.com/Classic.jpeg',
    },
    banner: {
      type: String,
      default:
        'https://jobinproject.s3.ap-south-1.amazonaws.com/default+banner.jpeg',
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    cv: {
      type: String,
      required: true,
    },
    indroduction: {
      type: String,
      required: true,
      maxLength: 520,
    },
    skills: [{
      title:{type:String},
      range:{type:Number}
    }],
    experience: [experienceSchema],
  },
  {
    timestamps: true,
  },
);

const candidateModel = mongoose.model('Candidates', candidateSchema);

export default candidateModel;
