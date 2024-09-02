import React, { useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import bg1 from '../assets/images/hero/bg.jpg';
import logo1 from '../assets/images/company/lenovo-logo.png';
import { UserContext } from '../context/UserContext';

import Navbar from '../components/navbar';
import Footer from '../components/footer';
import ScrollTop from '../components/scrollTop';

export default function JobApply() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [typesOfJobs, setTypesOfJobs] = useState('');
  const [description, setDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cv, setCv] = useState(null);
  const [error, setError] = useState(''); // New state for error handling
  let { id } = useParams();
  const { userId } = useContext(UserContext);

  const Submit = async (e) => {
    e.preventDefault();
  
    if (description.length > 220) {
      setError('Description must not exceed 220 characters');
      return;
    } else {
      setError(''); // Clear error if validation passes
    }
  
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('jobTitle', jobTitle);
    data.append('typesOfJobs', typesOfJobs);
    data.append('description', description);
    data.append('phoneNumber', phoneNumber);
  
    if (cv) data.append('cv', cv);
  
    try {
      const response = await axios.post(
        `http://localhost:8001/job/jobapply/${id}?userId=${userId}`,
        data,
      );
  
      console.log('Response:', response.data);
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleCvChange = (event) => {
    const file = event.target.files[0];
    console.log('Selected CV file:', file);
    if (file) {
      setCv(file);
    }
  };

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
                  src={logo1}
                  className='avatar avatar-small rounded-pill p-2 bg-white'
                  alt=''
                />
                <h5 className='heading fw-semibold mb-0 sub-heading text-white title-dark mt-3'>
                  Back-End Developer
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
                  <Link to='/job-grid-one'>Job</Link>
                </li>
                <li className='breadcrumb-item active' aria-current='page'>
                  Job Apply
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

      <section className='section bg-light'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-7 col-md-7'>
              <div className='card border-0'>
                <form onSubmit={Submit} className='rounded shadow p-4'>
                  <div className='row'>
                    <div className='col-12'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Your Name :<span className='text-danger'>*</span>
                        </label>
                        <input
                          name='name'
                          id='name2'
                          type='text'
                          className='form-control'
                          placeholder='First Name :'
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='col-12'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Your Email :<span className='text-danger'>*</span>
                        </label>
                        <input
                          name='email'
                          id='email2'
                          type='email'
                          className='form-control'
                          placeholder='Your email :'
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='col-12'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Your Phone no. :<span className='text-danger'>*</span>
                        </label>

                        <PhoneInput
                          id='phon'
                          country={'eg'}
                          className='form-control'
                          enableSearch={true}
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e)}
                          inputStyle={{
                            width: '100%',
                            height: '50px',
                          }}
                        />
                      </div>
                    </div>
                    <div className='col-12'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Job Title :
                        </label>
                        <input
                          name='subject'
                          id='subject2'
                          className='form-control'
                          placeholder='Title :'
                          onChange={(e) => setJobTitle(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='col-12'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Types of jobs :
                        </label>
                        <select
                          className='form-control form-select'
                          id='Sortbylist-Shop'
                          onChange={(e) => setTypesOfJobs(e.target.value)}
                        >
                          <option>All Jobs</option>
                          <option>Full Time</option>
                          <option>Half Time</option>
                          <option>Remote</option>
                          <option>In Office</option>
                        </select>
                      </div>
                    </div>
                    <div className='col-12'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Description :
                        </label>
                        <textarea
                          name='comments'
                          id='comments2'
                          rows='4'
                          className='form-control'
                          placeholder='Describe the job :'
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        {error && (
                          <div className='text-danger mt-2'>{error}</div>
                        )}
                      </div>
                    </div>
                    <div className='col-12'>
                      <div className='mb-3'>
                        <label
                          htmlFor='formFile'
                          className='form-label fw-semibold'
                        >
                          Upload Your Cv / Resume :
                        </label>
                        <input
                          className='form-control'
                          type='file'
                          id='formFile'
                          onChange={handleCvChange}
                        />
                      </div>
                    </div>
                    <div className='col-12'>
                      <div className='mb-3'>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            value=''
                            id='flexCheckDefault'
                          />
                          <label
                            className='form-check-label'
                            htmlFor='flexCheckDefault'
                          >
                            I Accept{' '}
                            <Link
                              to='#'
                              className='text-primary fw-semibold'
                            >
                              Terms and Conditions
                            </Link>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className='col-12 text-center'>
                      <button
                        type='submit'
                        className='btn btn-primary'
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </form>
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
