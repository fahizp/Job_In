import express from 'express';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { jobInterface } from '../utils/typos';
import jobApplyModel from '../models/jobModel';
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
export const jobList = async (
    req: express.Request,
    res: express.Response,
  ) => {
    try {
      //getting job list from job collection
      const jobList = await jobApplyModel.aggregate([
        {
          $project: {
            jobTitle: 1,
            typesOfJobs: 1,
            Country: 1,
            logo: 1,
          },
        },
      ]);
  
      return res.status(200).json({ jobList: jobList });
    } catch (error) {
      console.error('Error on fetching job details:', error);
      res.status(500).send('Internal server error');
    }
  };
  
