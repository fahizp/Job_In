import express from 'express';
import candidateModel from '../models/canididateModel';
import { CandidateInterface } from '../utils/typos';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { log } from 'console';

export const candidatePost = async (
  req: express.Request,
  res: express.Response,
) => {
  const bucketName = process.env.BUCKET_NAME as string;
  const bucketRegion = process.env.BUCKET_REGION as string;
  const s3AccessKey = process.env.S3_ACCESS_KEY as string;
  const s3SecretAccessKey = process.env.S3_SECRET_ACCESS_KEY as string;

  const s3 = new S3Client({
    credentials: {
      accessKeyId: s3AccessKey,
      secretAccessKey: s3SecretAccessKey,
    },
    region: bucketRegion,
  });

  try {
    const {
      firstName,
      lastName,
      email,
      dateOfBirth,
      address,
      city,
      country,
      mobileNumber,
      occupation,
      indroduction,
      salary,
      role,
      location,
      description,
      timeLine,
      skills,
    }: CandidateInterface = req.body;

    const { profilePhoto, cv, logo,banner }: any = req.files;

    //checking the required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !dateOfBirth ||
      !address ||
      !city ||
      !dateOfBirth ||
      !country ||
      !mobileNumber ||
      !occupation ||
      !indroduction
    ) {
      return res.status(400).send('Missing required fields');
    }

    //checking email already exist
    const emailExist = await candidateModel.findOne({ email });
    if (emailExist) {
      console.log('email already in use');
      return res.status(409).json({ messaage: 'email already exist' });
    }
    //checking mobile number already exist
    const mobileNumberExist = await candidateModel.findOne({ mobileNumber });
    if (mobileNumberExist) {
      console.log('mobile Number already in use');
      return res.status(409).json({ messaage: 'mobile Number already exist' });
    }

    // Upload Profile Photo
    const profilePhotoParams = {
      Bucket: bucketName,
      Key: `profile-photos/${profilePhoto[0].originalname}`,
      Body: profilePhoto[0].buffer,
      ContentType: profilePhoto[0].mimetype,
    };
    const profilePhotoCommand = new PutObjectCommand(profilePhotoParams);
    await s3.send(profilePhotoCommand);

    // Upload CV
    const cvParams = {
      Bucket: bucketName,
      Key: `cvs/${cv[0].originalname}`,
      Body: cv[0].buffer,
      ContentType: cv[0].mimetype,
    };
    const cvCommand = new PutObjectCommand(cvParams);
    await s3.send(cvCommand);

    // Upload logo
    const logoParams = {
      Bucket: bucketName,
      Key: `logos/${logo[0].originalname}`,
      Body: logo[0].buffer,
      ContentType: logo[0].mimetype,
    };
    const logoCommand = new PutObjectCommand(logoParams);
    await s3.send(logoCommand);

    // Upload Banner
    const bannerParams = {
      Bucket: bucketName,
      Key: `banners/${banner[0].originalname}`,
      Body: banner[0].buffer,
      ContentType: banner[0].mimetype,
    };
    const bannerCommand = new PutObjectCommand(bannerParams);
    await s3.send(bannerCommand);

    // Create a new user
    const newCandidate = new candidateModel({
      firstName,
      lastName,
      email,
      dateOfBirth,
      address,
      city,
      country,
      mobileNumber,
      occupation,
      indroduction,
      profilePhoto: `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/profile-photos/${profilePhoto[0].originalname}`,
      cv: `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/cvs/${cv[0].originalname}`,
      banner:`https://${bucketName}.s3.${bucketRegion}.amazonaws.com/banners/${banner[0].originalname}`,
      skills: JSON.parse(skills),
      experience: [
        {
          role,
          location,
          description,
          timeLine,
          logo: `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/logos/${logo[0].originalname}`,
          salary,
        },
      ],
    });

    await newCandidate.save();
    res.status(200).json({
      message: 'Candidate created successfully',
      candidate: newCandidate,
    });
  } catch (error) {
    console.error('Error handling form submission:', error);
    res.status(500).send('Internal server error');
  }
};

export const candidateList = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    //getting candidate details from candidate collection
    const candidateList = await candidateModel.aggregate([
      {
        $project: {
          firstName: 1,
          lastName: 1,
          occupation: 1,
          salary: 1,
          timeLine: 1,
        },
      },
    ]);
    return res.status(200).json({ candidateList: candidateList });
  } catch (error) {
    console.error('Error on fetching candidate details:', error);
    res.status(500).send('Internal server error');
  }
};
