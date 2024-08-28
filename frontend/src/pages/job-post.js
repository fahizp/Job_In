import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import countryList from 'react-select-country-list';
import Select from 'react-select';
import bg1 from '../assets/images/hero/bg.jpg';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import ScrollTop from '../components/scrollTop';

export default function JobPost() {
  const [logo, setLogo] = useState(null);
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobType, setJobType] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [experience, setExperience] = useState('');
  const [qualification, setQualification] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [postedDate, setPostedDate] = useState(new Date().toISOString().split('T')[0]);

  const Submit = async (e) => {
    e.preventDefault();
    const countryName = country?.label || '';

    const formData = new FormData();
    formData.append('title', title);
    formData.append('companyName', companyName);
    formData.append('jobType', jobType);
    formData.append('country', countryName);
    formData.append('state', state);
    formData.append('address', address);
    formData.append('jobCategory', jobCategory);
    formData.append('minSalary', minSalary);
    formData.append('maxSalary', maxSalary);
    formData.append('experience', experience);
    formData.append('qualification', qualification);
    formData.append('responsibilities', responsibilities);
    formData.append('description', description);
    formData.append('requirements', requirements);
    formData.append('postedDate', postedDate);

    if (logo) {
      formData.append('logo', logo);
    }

    try {
      const response = await axios.post(
        'http://localhost:8001/job/jobpost',
        formData
      );
      console.log('Response:', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const options = countryList().getData();

  const changeHandler = (selectedOption) => {
    setCountry(selectedOption);
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogo(file);
    }
  };

  const handleDateChange = (e) => {
    setPostedDate(e.target.value);
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
                <h5 className='heading fw-semibold mb-0 sub-heading text-white title-dark'>
                  Create a Job Post
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
                  Job Post
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
            <div className='col-xl-7 col-lg-8'>
              <div className='card border-0'>
                <form onSubmit={Submit} className='rounded shadow p-4'>
                  <div className='row'>
                    <h5 className='mb-3'>Job Details:</h5>

                    <div className='col-12'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Job Title:
                        </label>
                        <input
                          name='title'
                          className='form-control'
                          placeholder='Title:'
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className='col-12'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Company Name:
                        </label>
                        <input
                          name='companyName'
                          className='form-control'
                          placeholder='Company Name:'
                          onChange={(e) => setCompanyName(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Upload Logo:
                        </label>
                        <input
                          type='file'
                          accept='image/*'
                          className='form-control'
                          onChange={handleLogoChange}
                        />
                      </div>
                    </div>

                    <div className='col-12'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Description:
                        </label>
                        <textarea
                          name='description'
                          rows='4'
                          className='form-control'
                          placeholder='Describe the job:'
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        ></textarea>
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Job Type:
                        </label>
                        <input
                          name='jobType'
                          className='form-control'
                          placeholder='Job Type:'
                          onChange={(e) => setJobType(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Job Category:
                        </label>
                        <select
                          className='form-control form-select'
                          onChange={(e) => setJobCategory(e.target.value)}
                          required
                        >
                          <option value=''>Select Category</option>
                          <option value='Full Time'>Full Time</option>
                          <option value='Part Time'>Part Time</option>
                          <option value='Remote'>Remote</option>
                          <option value='In Office'>In Office</option>
                        </select>
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Salary (Monthly):
                        </label>
                      </div>
                    </div>

                    <div className='col-md-3'>
                      <div className='mb-3'>
                        <div className='input-group mb-3'>
                          <span className='input-group-text'>$</span>
                          <input
                            type='number'
                            className='form-control'
                            min='1'
                            placeholder='Min'
                            onChange={(e) => setMinSalary(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className='col-md-3'>
                      <div className='mb-3'>
                        <div className='input-group mb-3'>
                          <span className='input-group-text'>$</span>
                          <input
                            type='number'
                            className='form-control'
                            min='1'
                            placeholder='Max'
                            onChange={(e) => setMaxSalary(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Country:
                        </label>
                        <Select
                          options={options}
                          value={country}
                          onChange={changeHandler}
                          placeholder='Select Country'
                          isClearable
                          required
                        />
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          State:
                        </label>
                        <input
                          name='state'
                          className='form-control'
                          placeholder='State:'
                          onChange={(e) => setState(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Address:
                        </label>
                        <input
                          name='address'
                          className='form-control'
                          placeholder='Address:'
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Posted Date:
                        </label>
                        <input
                          type='date'
                          className='form-control'
                          value={postedDate}
                          onChange={handleDateChange}
                          required
                        />
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Experience:
                        </label>
                        <input
                          name='experience'
                          className='form-control'
                          placeholder='Experience:'
                          onChange={(e) => setExperience(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Qualification:
                        </label>
                        <input
                          name='qualification'
                          className='form-control'
                          placeholder='Qualification:'
                          onChange={(e) => setQualification(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className='col-12'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Responsibilities:
                        </label>
                        <textarea
                          name='responsibilities'
                          rows='4'
                          className='form-control'
                          placeholder='Job Responsibilities:'
                          onChange={(e) => setResponsibilities(e.target.value)}
                          required
                        ></textarea>
                      </div>
                    </div>

                    <div className='col-12'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Requirements:
                        </label>
                        <textarea
                          name='requirements'
                          rows='4'
                          className='form-control'
                          placeholder='Job Requirements:'
                          onChange={(e) => setRequirements(e.target.value)}
                          required
                        ></textarea>
                      </div>
                    </div>

                    <div className='col-lg-12'>
                      <div className='d-grid'>
                        <button type='submit' className='btn btn-primary'>
                          Post a Job
                        </button>
                      </div>
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
