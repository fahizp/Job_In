import express from 'express';
import { ObjectId } from 'mongodb';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { jobInterface, MatchStage } from '../utils/typos';
import {
  // appliedJobModel,
  jobApplyModel,
  jobPostModel,
} from '../models/jobModel';
import { validationResult } from 'express-validator';
import authModel from '../models/authModel';

//job apply
export const jobApply = async (req: express.Request, res: express.Response) => {
  // Retrieve and cast environment variables for S3 bucket configuration
  const bucketName = process.env.BUCKET_NAME as string;
  const bucketRegion = process.env.BUCKET_REGION as string;
  const s3AccessKey = process.env.S3_ACCESS_KEY as string;
  const s3SecretAccessKey = process.env.S3_SECRET_ACCESS_KEY as string;

  //configuring an AWS S3 client
  const s3 = new S3Client({
    credentials: {
      accessKeyId: s3AccessKey,
      secretAccessKey: s3SecretAccessKey,
    },
    region: bucketRegion,
  });
  // taking id from req.params
  const { userId, jobId } = req.params;

  //checking user exist
  const userExist = await authModel.findById(userId);
  if (!userExist) {
    return res.status(200).json("user doesn't exist");
  }
  // taking username and location from req.body
  const { name, email, coverLetter, phoneNumber, experience }: jobInterface =
    req.body;

  //Retrieve the uploaded file from the request object.
  const cv = req.file;

  try {
    //Error handling during form validation
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }

    // Upload cv
    const cvParams = {
      Bucket: bucketName,
      Key: cv?.originalname,
      Body: cv?.buffer,
      ContentType: cv?.mimetype,
    };

    const cvCommand = new PutObjectCommand(cvParams);
    await s3.send(cvCommand);

    //storing job apply details
    const jobApply = new jobApplyModel({
      name,
      email,
      coverLetter,
      phoneNumber,
      experience,
      cv: `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${cv?.originalname}`,
      userId,
      jobId,
    });
    //saving job apply
    await jobApply.save();

    // storing userId to  appliedUsersId field in jobPostModel
    const jobDetails = await jobPostModel.findByIdAndUpdate(jobId, {
      $push: { appliedUsersId: userId },
    });

    await jobApply.save()

    //sending response
    return res
      .status(200)
      .json({ message: 'Job apply successfully', jobApply });
  } catch (error) {
    console.error('Internal server error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// job list
export const jobList = async (req: express.Request, res: express.Response) => {
  try {

    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    const skip = (pageNumber - 1) * limitNumber;
     const{userId}= req.query
 console.log(userId)
     //fetching jobs
     const jobsList = await jobPostModel.find().skip(skip).limit(limitNumber);
 
     // Initialize an empty array named 'alljobs' to store job-related data
     let alljobs = [];
 
     //set forloop for jobs collection
     for (let i = 0; i < jobsList.length; i++) {
       //take userId into users
       let users = jobsList[i].appliedUsersId;
 
       //set forloop for userd Id
       for (let j = 0; j <= users.length; j++) {
         //checking userId and job
         if (userId == users[j]) {
           //adding new field to job[i] object and set status to true
           jobsList[i].status = 'true';
 
           //add job to alljobs array
           alljobs.push(jobsList[i]);
           break;
         } else {
           //adding new field to job[i] object and set status  to false
           jobsList[i].status = 'false';
           //add job to alljobs array
           alljobs.push(jobsList[i]);
         }
       }
     }

     const totalCount = await jobPostModel.countDocuments();
     const totalPages = Math.ceil(totalCount / limitNumber);

    return res.status(200).json({
      alljobs,
      totalPages,
      currentPage: pageNumber,
    
    });
    //
   

  } catch (error) {
    console.error('Error fetching job list:', error);
    res.status(500).send('Internal server error');
  }
};



//job details
export const jobDetails = async (
  req: express.Request,
  res: express.Response,
) => {
  // taking id from req.params
  const jobId = req.params.id;

  try {
    //fetching job details
    const jobDetails = await jobPostModel.findById(jobId);
    return res.status(200).json({ jobDetails: jobDetails });
  } catch (error) {
    console.error('Error on fetching job details:', error);
    res.status(500).send('Internal server error');
  }
};

//job serach
export const jobSearch = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    // taking search parameters from the request body
    const keywords = req.query.keywords as string
    const country = req.query.country as string
    const jobCategory = req.query.jobCategory as string
    //array for aggregation stages
    const pipeline = [];

    //object to hold the criteria for the search
    const matchStage: MatchStage = {
      $or: [],
    };

    // checking keywords
    if (keywords) {
      matchStage.$or = [
        { title: { $regex: keywords, $options: 'i' } },
        { companyName: { $regex: keywords, $options: 'i' } },
        { description: { $regex: keywords, $options: 'i' } },
        { experience: { $regex: keywords, $options: 'i' } },
      ];
    }

    // checking country
    if (country) {
      matchStage.country = { $regex: country, $options: 'i' };
    }

    //checking job category
    if (jobCategory) {
      matchStage.jobCategory = { $regex: jobCategory, $options: 'i' };
    }

    // push the $match stage to the pipeline
    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }

    // Add the $project stage to the pipeline
    pipeline.push({
      $project: {
        title: 1,
        jobCategory: 1,
        country: 1,
        logo: 1,
        minSalary: 1,
        maxSalary: 1,
        postedDate: 1,
      },
    });

    pipeline.push({
      $sort: { postedDate: -1 } as Record<string, 1 | -1>,
    });

    const jobs = await jobPostModel.aggregate(pipeline);

    // Send the search results
    return res.status(200).json({ results: jobs });
  } catch (error) {
    console.error('Error on searching jobs:', error);
    res.status(500).send('Internal server error');
  }
};

//job post
export const jobPost = async (req: express.Request, res: express.Response) => {
  // Retrieve and cast environment variables for S3 bucket configuration
  const bucketName = process.env.BUCKET_NAME as string;
  const bucketRegion = process.env.BUCKET_REGION as string;
  const s3AccessKey = process.env.S3_ACCESS_KEY as string;
  const s3SecretAccessKey = process.env.S3_SECRET_ACCESS_KEY as string;

  //configuring an AWS S3 client
  const s3 = new S3Client({
    credentials: {
      accessKeyId: s3AccessKey,
      secretAccessKey: s3SecretAccessKey,
    },
    region: bucketRegion,
  });

  try {
    //taking values from req.body
    const {
      title,
      companyName,
      jobType,
      country,
      state,
      jobCategory,
      minSalary,
      maxSalary,
      experience,
      qualification,
      responsibilities,
      description,
      Requireds,
      address,
    }: jobInterface = req.body;

    //taking companylogo from req.file
    const logo = req.file;

    //checking the required field
    if (
      !title ||
      !companyName ||
      !jobType ||
      !jobCategory ||
      !country ||
      !state ||
      !experience ||
      !qualification ||
      !description ||
      !maxSalary ||
      !minSalary
    ) {
      return res.status(400).send('Missing required fields');
    }

    // Upload Profile Photo
    const logoParams = {
      Bucket: bucketName,
      Key: logo?.originalname,
      Body: logo?.buffer,
      ContentType: logo?.mimetype,
    };
    const logoCommand = new PutObjectCommand(logoParams);
    await s3.send(logoCommand);

    // Create a new user
    const newjob = new jobPostModel({
      title,
      companyName,
      jobType,
      country,
      state,
      jobCategory,
      maxSalary,
      minSalary,
      experience,
      qualification,
      responsibilities,
      description,
      Requireds,
      address,
      logo: `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${logo?.originalname}`,
      status: false,
    });

    //saving new candidate
    await newjob.save();
    res.status(200).json({
      message: 'job created successfully',
      candidate: newjob,
    });
  } catch (error) {
    console.error('Error handling form submission:', error);
    res.status(500).send('Internal server error');
  }
};
