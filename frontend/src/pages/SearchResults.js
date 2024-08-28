import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { FiClock, FiMapPin, FiBookmark } from '../assets/icons/vander';
import { FaArrowRight } from 'react-icons/fa'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const daysAgo = (dateString) => {
  const postedDate = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - postedDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function SearchResults() {
  const query = useQuery();
  const keywords = query.get('keywords');
  const [results, setResults] = useState({ jobs: [], candidates: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/homesearch?keywords=${keywords}`,
        );
        console.log('Full Response:', response.data);

        let jobs = [];
        let candidates = [];

        response.data.forEach((item) => {
          if (Array.isArray(item.jobs)) {
            jobs = item.jobs;
          }
          if (Array.isArray(item.candidates)) {
            candidates = item.candidates;
          }
        });

        setResults({ jobs, candidates });
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [keywords]);

 

  return (
    <div>
       <h5 className='h5'>Serch Result:={keywords}</h5> 
      <div className='container mt-60'>
         
        <div className='row g-4'>
       <h3>jobs  <Link className="btn btn-link btn-sm view-all-link"  to={`/job-list-one`}>View All <FaArrowRight className="arrow-icon" /></Link></h3>
       

          {results.jobs.length > 0 ? (
            results.jobs.map((item, index) => (
              
              <div className='col-12' key={index}>
                 <h5 className='h5'>
                 {keywords}
                </h5>             
                <div className='job-post job-post-list rounded shadow p-4 d-md-flex align-items-center justify-content-between position-relative'>
                  <div className='d-flex align-items-center w-310px'>
                    <img
                      src={item.logo}
                      className='avatar avatar-small rounded shadow p-3 bg-white'
                      alt=''
                    />
                    <div className='ms-3'>
                      <Link
                        to={`/job-detail-one/${item._id}`}
                        className='h5 title text-dark'
                      >
                        {item.title}
                      </Link>
                    </div>
                  </div>

                  <div className='d-flex align-items-center justify-content-between d-md-block mt-3 mt-md-0 w-100px'>
                    <span className='badge bg-soft-primary rounded-pill'>
                      {item.jobCategory}
                    </span>
                    <span className='text-muted d-flex align-items-center fw-medium mt-md-2'>
                      <FiClock className='fea icon-sm me-1 align-middle' />
                      {daysAgo(item.postedDate)} days ago
                    </span>
                  </div>

                  <div className='d-flex align-items-center justify-content-between d-md-block mt-2 mt-md-0 w-130px'>
                    <span className='text-muted d-flex align-items-center'>
                      <FiMapPin className='fea icon-sm me-1 align-middle' />
                      {item.country}
                    </span>
                    <span className='d-flex fw-medium mt-md-2'>
                      ${item.minSalary} - ${item.maxSalary}
                    </span>
                  </div>

                  <div className='mt-3 mt-md-0'>
                    <Link
                      to={`/job-detail-one/${item._id}`}
                      className='btn btn-sm btn-primary w-full ms-md-1'
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No jobs found.</p>
          )}
        </div>
      </div>
      

      <div className='container mt-60'>
        <div className='row g-4'>
        <h3>candidates <Link className="btn btn-link btn-sm view-all-link"  to={`/candidates`}>View All <FaArrowRight className="arrow-icon" /></Link></h3>

        {results.candidates.length > 0 ? (
          results.candidates.map((item, index) => (
              <div className='col-12' key={index}>
                           
                <div className='job-post job-post-list rounded shadow p-4 d-md-flex align-items-center justify-content-between position-relative'>
                  <div className='d-flex align-items-center w-310px'>
                    <img
                      src={item.profilePhoto}
                      className='avatar avatar-small rounded shadow p-3 bg-white'
                      alt=''
                    />
                    <div className='ms-3'>
                      <Link
                        to={`/job-detail-one/${item._id}`}
                        className='h5 title text-dark'
                      >
                         {item.firstName} {item.lastName}
                      </Link>
                    </div>
                  </div>

                  <div className='d-flex align-items-center justify-content-between d-md-block mt-3 mt-md-0 w-100px'>
                    <span className='badge bg-soft-primary rounded-pill'>
                      {item.occupation}
                    </span>
                    <span className='badge bg-soft-primary rounded-pill'>
                      {item.occupation}
                    </span>
                  </div>

<div className='text-center'>
                          <p className='text-muted fw-medium mb-0'>
                            Experience:
                          </p>
                          <p className='mb-0 fw-medium'>
                            {item.totalExperience}
                          </p>
                        </div>
                  <div className='mt-3 mt-md-0'>
                  <Link
                          to={`/candidate-profile/${item._id}`}
                          className='btn btn-sm btn-primary me-1'
                        >
                          View Profile
                        </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No Candidates found.</p>
          )}
        </div>
      </div>


      {/* <h2>Search Results for "{keywords}"</h2>
      <div>
        <h3>Jobs:</h3>
        {results.jobs.length > 0 ? (
          results.jobs.map((job, index) => (
            <div key={index}>
              <h4>{job.jobCategory || job}</h4>
            </div>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
      
      <div>
        <h3>Candidates:</h3>
        {results.candidates.length > 0 ? (
          results.candidates.map((candidate, index) => (
            <div key={index}>
              <h4>{candidate.occupation}</h4>
              <p>{candidate.firstName} {candidate.lastName}</p>
            </div>
          ))
        ) : (
          <p>No candidates found.</p>
        )}
      </div> */}
    </div>
  );
}
