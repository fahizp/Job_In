import express from 'express';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { jobInterface } from '../utils/typos';
import { jobApplyModel, jobPostModel } from '../models/jobModel';
import { validationResult } from 'express-validator';

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
  const userId = req.params.id;

  // taking username and location from req.body
  const {
    name,
    email,
    description,
    phoneNumber,
    jobTitle,
    typesOfJobs,
  }: jobInterface = req.body;

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
      description,
      phoneNumber,
      jobTitle,
      typesOfJobs,
      cv: `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${cv?.originalname}`,
    });

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
    // getting job list from job collection
    const jobList = await jobPostModel.aggregate([
      {
        $project: {
          title: 1,
          jobCategory: 1,
          Country: 1,
          logo: 1,
          minSalary: 1,
          maxSalary: 1,
          postedDate: 1,
        },
      },
    ]);

    return res.status(200).json({ jobList: jobList });
  } catch (error) {
    console.error('Error on fetching job list:', error);
    res.status(500).send('Internal server error');
  }
};

//job details
export const jobDetails = async (
  req: express.Request,
  res: express.Response,
) => {
  // taking id from req.params
  const userId = req.params.id;

  try {
    //fetching job details
    const jobDetails = await jobPostModel.findById(userId);
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
  const { searchQuery } = req.body;

  try {
    // create a regular experssion for case-insensitve matches
    const regex = new RegExp(searchQuery, 'i');

    //aggregation for search job
    const results = await jobPostModel.aggregate([
      {
        $match:{
          $or:[
            {title:{$regex:regex}},
            {country:{$regex:regex}},
            {jobCategory:{$regex:regex}},
          ]
        }
      },
      // {$sort:{name:1}},
      {$project:{
        title:1
      }}
    ])
    return res.status(200).json({ results: results });
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
      Industry,
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
      Industry,
      address,
      logo: `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${logo?.originalname}`,
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
