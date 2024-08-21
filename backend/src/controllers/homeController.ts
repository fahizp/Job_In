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
    const { keywords } = req.body;
    //finding candidates using keyword

    if (keywords === '') {
      return res.status(200).json('Not results found');
    }
    const candidates = await candidateModel.aggregate([
      { $match: { occupation: new RegExp(keywords, 'i') } },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          occupation: 1,
          profilePhoto: 1,
          totalExperience: 1,
        },
      },
    ]);

    //finding jobs using keyword and projecting fields.
    const jobs = await jobPostModel.aggregate([
      { $match: { title: new RegExp(keywords, 'i') } },
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
