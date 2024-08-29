import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import logo1 from '../assets/images/company/lenovo-logo.png';
import bg1 from '../assets/images/hero/bg.jpg';

import Navbar from '../components/navbar';
import Footer from '../components/footer';
import ScrollTop from '../components/scrollTop';

import {
  FiLayout,
  FiMapPin,
  FiUserCheck,
  FiClock,
  FiMonitor,
  FiBriefcase,
  FiBook,
  FiDollarSign,
  FiArrowRight,
} from '../assets/icons/vander';

export default function JobDetailOne() {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let { id } = useParams();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/job/jobdetails/${id}`);
        setJob(response.data.jobDetails);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Navbar navClass='defaultscroll sticky' navLight={true} />

      <section
        className='bg-half-170 d-table w-100'
        style={{ backgroundImage: `url(${bg1})`, backgroundPosition: 'top' }}
      >
        <div className='bg-overlay bg-gradient-overlay'></div>
        <div className='container'>
          <div className='row mt-5 justify-content-center'>
            <div className='col-12'>
              <div className='title-heading text-center'>
                <img
                  src={job?.logo ? job.logo : logo1}
                  className='avatar avatar-small rounded-pill p-2 bg-white'
                  alt=''
                />
                <h5 className='heading fw-semibold mb-0 sub-heading text-white title-dark mt-3'>
                  {job?.title ? job.title : 'Job Title'}
                </h5>
              </div>
            </div>
          </div>

          <div className='position-middle-bottom'>
            <nav aria-label='breadcrumb' className='d-block'>
              <ul className='breadcrumb breadcrumb-muted mb-0 p-0'>
                <li className='breadcrumb-item'>
                  <Link to='/'>job_in</Link>
                </li>
                <li className='breadcrumb-item'>
                  <Link to='/job-grid-one'>Jobs</Link>
                </li>
                <li className='breadcrumb-item active' aria-current='page'>
                  Job Detail
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <div className='position-relative'>
        <div className='shape overflow-hidden text-white'>
          <svg
            viewBox='0 0 2880 48'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z'
              fill='currentColor'
            ></path>
          </svg>
        </div>
      </div>

      <section className='section'>
        <div className='container'>
          <div className='row g-4'>
            <div className='col-lg-4 col-md-6 col-12'>
              <div className='card bg-white rounded shadow sticky-bar'>
                <div className='p-4'>
                  <h5 className='mb-0'>Job Information</h5>
                </div>

                <div className='card-body p-4 border-top'>
                  <div className='d-flex widget align-items-center'>
                    <FiLayout className='fea icon-ex-md me-3' />
                    <div className='flex-1'>
                      <h6 className='widget-title mb-0'>Company Name:</h6>
                      <small className='text-primary mb-0'>
                        {job?.companyName ? job.companyName : 'Company Name'}
                      </small>
                    </div>
                  </div>

                  <div className='d-flex widget align-items-center mt-3'>
                    <FiUserCheck className='fea icon-ex-md me-3' />
                    <div className='flex-1'>
                      <h6 className='widget-title mb-0'>Employee Type:</h6>
                      <small className='text-primary mb-0'>
                        {job?.jobCategory ? job.jobCategory : 'Full Time'}
                      </small>
                    </div>
                  </div>

                  <div className='d-flex widget align-items-center mt-3'>
                    <FiMapPin className='fea icon-ex-md me-3' />
                    <div className='flex-1'>
                      <h6 className='widget-title mb-0'>Location:</h6>
                      <small className='text-primary mb-0'>
                        {job?.city ? job.city : 'City'}, {job?.country ? job.country : 'country'}
                      </small>
                    </div>
                  </div>

                  <div className='d-flex widget align-items-center mt-3'>
                    <FiMonitor className='fea icon-ex-md me-3' />
                    <div className='flex-1'>
                      <h6 className='widget-title mb-0'>Job Type:</h6>
                      <small className='text-primary mb-0'>
                        {job?.title ? job.title : 'Job Title'}
                      </small>
                    </div>
                  </div>

                  <div className='d-flex widget align-items-center mt-3'>
                    <FiBriefcase className='fea icon-ex-md me-3' />
                    <div className='flex-1'>
                      <h6 className='widget-title mb-0'>Experience:</h6>
                      <small className='text-primary mb-0'>{job?.experience ? job.experience : 'Experience.'}
                      </small>
                    </div>
                  </div>

                  <div className='d-flex widget align-items-center mt-3'>
                    <FiBook className='fea icon-ex-md me-3' />
                    <div className='flex-1'>
                      <h6 className='widget-title mb-0'>qualification:</h6>
                      <small className='text-primary mb-0'>{job?.qualification ? job.qualification : 'qualification.'}
                      </small>
                    </div>
                  </div>

                  <div className='d-flex widget align-items-center mt-3'>
                    <FiDollarSign className='fea icon-ex-md me-3' />
                    <div className='flex-1'>
                      <h6 className='widget-title mb-0'>Salary:</h6>
                      <small className='text-primary mb-0'>${job?.minSalary}-${job?.maxSalary}</small>
                    </div>
                  </div>

                  <div className='d-flex widget align-items-center mt-3'>
                    <FiClock className='fea icon-ex-md me-3' />
                    <div className='flex-1'>
                      <h6 className='widget-title mb-0'>Date posted:</h6>
                      <small className='text-primary mb-0'>
                        {job?.date ? job.date : '19th June, 2023'}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-lg-8 col-md-6 col-12'>
              <h5>Job Description: </h5>
              <p className='text-muted'>
                {job?.description ? job.description : 'Job description not available.'}
              </p>

              <h5 className='mt-4'>Responsibilities and Duties: </h5>
              <ul className='list-unstyled'>
                  <li className='text-muted mt-2'>
                    <FiArrowRight className='fea icon-sm text-primary me-2' />
                    {job.responsibilities}
                  </li>
              </ul>

              <h5 className='mt-4'>
                Required Experience, Skills and qualification:
              </h5>
              <ul className='list-unstyled'>
              
                  <li className='text-muted mt-2' >
                    <FiArrowRight className='fea icon-sm text-primary me-2' />
                    {job?.Requireds ? job.Requireds : 'Required Experience, Skills and qualification.'}
                    </li>
              </ul>

              <div className='d-flex align-items-center mt-4'>
              <Link to={`/job-apply/${job._id}`} className='btn btn-outline-primary'>
                  Apply Now <i className='mdi mdi-send'></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollTop />
    </>
  );
}
