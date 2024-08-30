import express from 'express';
import { jobPostModel } from '../models/jobModel';
import candidateModel from '../models/canididateModel';

//Home serach
export const homeSearch = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    // taking search parameters from the request body
    const keywords = req.body.keywords as string;
    //finding candidates using keyword
    console.log(keywords);
    

    if (keywords==="") {
      return res.status(200).json('Not results found');
    }
    const candidates = await candidateModel.aggregate([
      {
        $match: {
          $or: [
            { occupation: new RegExp(keywords, 'i') },
            { city: new RegExp(keywords, 'i') },
            { country: new RegExp(keywords, 'i') },
            { experience: { $elemMatch: { role: new RegExp(keywords, 'i') } } },
            { companyName: new RegExp(keywords, 'i') },
            { totalExperience: new RegExp(keywords, 'i') },
            { skills: { $elemMatch: { title: new RegExp(keywords, 'i') } } }
          ],
        },
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          occupation: 1,
          profilePhoto: 1,
          totalExperience: 1,
        },
      },
      { $limit: 5 },
    ]);

    //finding jobs using keyword and projecting fields.
    const jobs = await jobPostModel.aggregate([
      {
        $match: {
          $or: [
            { companyName: new RegExp(keywords, 'i') },
            { jobType: new RegExp(keywords, 'i') },
            { companyName: new RegExp(keywords, 'i') },
            { jobCategory: new RegExp(keywords, 'i') },
            { experience: new RegExp(keywords, 'i') },
            { country: new RegExp(keywords, 'i') },
            { state: new RegExp(keywords, 'i') },
          ],
        },
      },
      {
        $project: {
          title: 1,
          jobCategory: 1,
          country: 1,
          logo: 1,
          minSalary: 1,
          maxSalary: 1,
          postedDate: 1,
        },
      },
      { $limit: 5 },
    ]);

    //checking jobs and candidate.
    if (jobs.length === 0 && candidates.length === 0) {
      // if jobs and candidates not found
      const results = [
        { jobs: 'Not results found' },
        { candidates: 'Not results found' },
      ];
      return res.status(200).json(results);
    } else if (jobs.length === 0 && candidates) {
      // if jobs not found
      const results = [
        { jobs: 'Not results found' },
        { candidates: candidates },
      ];
      return res.status(200).json(results);
    } else if (jobs && candidates.length === 0) {
      // if candidates not found
      const results = [{ jobs: jobs }, { candidates: 'Not results found' }];
      return res.status(200).json(results);
    } else {
      const results = [{ jobs: jobs }, { candidates: candidates }];
      return res.status(200).json({ results });
    }
  } catch (error) {
    console.error('Error on searching :', error);
    res.status(500).send('Internal server error');
  }
};
