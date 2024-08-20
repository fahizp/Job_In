import express from 'express';
import candidateModel from '../models/canididateModel';
import { CandidateInterface } from '../utils/typos';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { validationResult } from 'express-validator';

// candidate Post
export const candidatePost = async (
  req: express.Request,
  res: express.Response,
) => {
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
      companyName,
      totalExperience,
    }: CandidateInterface = req.body;

    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }

    const { profilePhoto, cv, logo, banner }: any = req.files;

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
      !indroduction ||
      !cv
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
    let uploadProfilePhoto;
    if (profilePhoto) {
      const profilePhotoParams = {
        Bucket: bucketName,
        Key: `profile-photos/${profilePhoto[0].originalname}`,
        Body: profilePhoto[0].buffer,
        ContentType: profilePhoto[0].mimetype,
      };
      const profilePhotoCommand = new PutObjectCommand(profilePhotoParams);
      uploadProfilePhoto = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/profile-photos/${profilePhoto[0].originalname}`;
      await s3.send(profilePhotoCommand);
    } else {
      uploadProfilePhoto =
        'https://jobinproject.s3.ap-south-1.amazonaws.com/Classic.jpeg';
    }

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
    let uploadLogo;
    if (logo) {
      const logoParams = {
        Bucket: bucketName,
        Key: `logos/${logo[0].originalname}`,
        Body: logo[0].buffer,
        ContentType: logo[0].mimetype,
      };
      uploadLogo = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/logos/${logo[0].originalname}`;
      const logoCommand = new PutObjectCommand(logoParams);
      await s3.send(logoCommand);
    } else {
      uploadLogo =
        'https://jobinproject.s3.ap-south-1.amazonaws.com/blank+comapny+logo.jpeg';
    }

    // Upload Banner
    let uploadBanner;
    if (banner) {
      const bannerParams = {
        Bucket: bucketName,
        Key: `banners/${banner[0].originalname}`,
        Body: banner[0].buffer,
        ContentType: banner[0].mimetype,
      };
      uploadBanner = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/banners/${banner[0].originalname}`;
      const bannerCommand = new PutObjectCommand(bannerParams);
      await s3.send(bannerCommand);
    } else {
      uploadBanner =
        'https://jobinproject.s3.ap-south-1.amazonaws.com/default+banner.jpeg';
    }
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
      profilePhoto: uploadProfilePhoto,
      cv: `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/cvs/${cv[0].originalname}`,
      banner: uploadBanner,
      skills: JSON.parse(skills),
      salary,
      totalExperience,
      experience: [
        {
          role,
          location,
          description,
          timeLine,
          logo: uploadLogo,
          companyName,
        },
      ],
    });

    //saving new candidate
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

// candidate list
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
          profilePhoto: 1,
          totalExperience:1,
          companyName: { $arrayElemAt: ['$experience.companyName', 0] },
        },
      },
    ]);

    return res.status(200).json({ candidateList: candidateList });
  } catch (error) {
    console.error('Error on fetching candidate details:', error);
    res.status(500).send('Internal server error');
  }
};

//candidate details
export const candidateDetails = async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  try{
      const candidate = await candidateModel.findById({_id:id})
  return res.status(200).json(candidate)
  }catch (err) {
      res.status(500).json(err);
    }
};