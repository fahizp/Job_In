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
  const [descriptionError, setDescriptionError] = useState('');
  const [requirementsError, setRequirementsError] = useState('');
  const [minSalaryError, setMinSalaryError] = useState('');
  const [maxSalaryError, setMaxSalaryError] = useState('');
  const [experienceError, setExperienceError] = useState('');

  const handleValidation = (text, type) => {
    if (text.length > 520) {
      if (type === 'description') {
        setDescriptionError('Description must be 520 characters or less.');
      } else if (type === 'requirements') {
        setRequirementsError('Requirements must be 520 characters or less.');
      }
    } else {
      if (type === 'description') {
        setDescriptionError('');
      } else if (type === 'requirements') {
        setRequirementsError('');
      }
    }
  };

  const validateSalary = (value, type) => {
    if (value && (value.length > 2 || isNaN(value))) {
      if (type === 'min') {
        setMinSalaryError('Min Salary must be a number with up to 2 digits.');
      } else if (type === 'max') {
        setMaxSalaryError('Max Salary must be a number with up to 2 digits.');
      }
    } else {
      if (type === 'min') {
        setMinSalaryError('');
      } else if (type === 'max') {
        setMaxSalaryError('');
      }
    }
  };

  const validateExperience = (value) => {
    if (value.length > 2) {
      setExperienceError('Experience must be 2 characters or less.');
    } else {
      setExperienceError('');
    }
  };

  const Submit = async (e) => {
    e.preventDefault();
    if (description.length > 520 || requirements.length > 520 || minSalary.length > 2 || maxSalary.length > 2 || experience.length > 2) {
      return;
    }

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

                    <div className='col-12'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>Logo:</label>
                        <input
                          type='file'
                          className='form-control'
                          onChange={handleLogoChange}
                        />
                      </div>
                    </div>

                    <div className='col-12'>
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
                          Location:
                        </label>
                        <Select
                          options={options}
                          onChange={changeHandler}
                          placeholder='Country'
                        />
                        <input
                          name='state'
                          className='form-control mt-2'
                          placeholder='State:'
                          onChange={(e) => setState(e.target.value)}
                          required
                        />
                        <input
                          name='address'
                          className='form-control mt-2'
                          placeholder='Address:'
                          onChange={(e) => setAddress(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Job Category:
                        </label>
                        <input
                          name='jobCategory'
                          className='form-control'
                          placeholder='Category:'
                          onChange={(e) => setJobCategory(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Min Salary:
                        </label>
                        <input
                          name='minSalary'
                          className='form-control'
                          placeholder='Min Salary:'
                          onChange={(e) => {
                            setMinSalary(e.target.value);
                            validateSalary(e.target.value, 'min');
                          }}
                          required
                        />
                        {minSalaryError && (
                          <div className='text-danger'>{minSalaryError}</div>
                        )}
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Max Salary:
                        </label>
                        <input
                          name='maxSalary'
                          className='form-control'
                          placeholder='Max Salary:'
                          onChange={(e) => {
                            setMaxSalary(e.target.value);
                            validateSalary(e.target.value, 'max');
                          }}
                          required
                        />
                        {maxSalaryError && (
                          <div className='text-danger'>{maxSalaryError}</div>
                        )}
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
                          onChange={(e) => {
                            setExperience(e.target.value);
                            validateExperience(e.target.value);
                          }}
                          required
                        />
                        {experienceError && (
                          <div className='text-danger'>{experienceError}</div>
                        )}
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
                          placeholder='Responsibilities:'
                          onChange={(e) => setResponsibilities(e.target.value)}
                          required
                        ></textarea>
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
                          placeholder='Description:'
                          onChange={(e) => {
                            setDescription(e.target.value);
                            handleValidation(e.target.value, 'description');
                          }}
                          required
                        ></textarea>
                        {descriptionError && (
                          <div className='text-danger'>{descriptionError}</div>
                        )}
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
                          placeholder='Requirements:'
                          onChange={(e) => {
                            setRequirements(e.target.value);
                            handleValidation(e.target.value, 'requirements');
                          }}
                          required
                        ></textarea>
                        {requirementsError && (
                          <div className='text-danger'>{requirementsError}</div>
                        )}
                      </div>
                    </div>

                    <div className='col-12'>
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

                    <div className='col-12'>
                      <div className='text-center'>
                        <button type='submit' className='btn btn-primary'>
                          Submit
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
