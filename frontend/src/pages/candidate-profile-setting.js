import React, { useState, useMemo } from 'react';
import axios from 'axios';
import image1 from '../assets/images/team/01.jpg';
import bg1 from '../assets/images/hero/bg5.jpg';
import NavbarDark from '../components/navbarDark';
import Footer from '../components/footer';
import ScrollTop from '../components/scrollTop';
import { FiCamera } from '../assets/icons/vander';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';

import 'bootstrap-icons/font/bootstrap-icons.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import countryList from 'react-select-country-list';
import Select from 'react-select';

export default function CandidateProfileSetting() {
  const [totalExperience, setTotalExperience] = useState('');
  const [timeLine, setTimeLine] = useState({ startYear: '', endYear: '' });
  const [cv, setCv] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [range, setRange] = useState('');
  const [profileFile, setProfileFile] = useState(image1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [location, setLocation] = useState('');
  const [indroduction, setIndroduction] = useState('');
  const [phone, setPhone] = useState('');
  const [logo, setLogo] = useState(null);
  const [logoFile, setLogoFile] = useState(image1);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [banner, setBanner] = useState(bg1);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState('');
  const [role, setRole] = useState('');
  const [salary, setSalary] = useState({
    minSalary: '',
    maxSalary: '',
  });
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [indroductionError, setIndroductionError] = useState('');
  const [totalExperienceError, setTotalExperienceError] = useState('');
  const [errorsalary, setErrorsalary] = useState({
    minSalary: '',
    maxSalary: '',
  });

  const [generalError, setGeneralError] = useState('');

  const handleValidation = (text, type) => {
    let error = '';

    switch (type) {
      case 'description':
        if (text.length > 220)
          error = 'Description must be 220 characters or less.';
        break;
      case 'indroduction':
        if (text.length > 520)
          error = 'Requirements must be 520 characters or less.';
        break;
      case 'totalExperience':
        if (text.length > 2)
          error = 'Total experience type in (yy) format only, add years.';
        break;
      case 'minSalary':
      case 'maxSalary':
        if (!/^\d+$/.test(text)) {
          error = 'Salary must be a number.';
        } else if (text.length < 2) {
          error = 'Salary must be at least 2 digits.';
        } else if (text.length > 2) {
          error = 'Salary must be 2 digits.';
        }
        break;
      default:
        break;
    }

    if (type === 'description') setDescriptionError(error);
    if (type === 'indroduction') setIndroductionError(error);
    if (type === 'totalExperience') setTotalExperienceError(error);
    if (type === 'minSalary' || type === 'maxSalary') {
      setErrorsalary((prevErrorsalary) => ({
        ...prevErrorsalary,
        [type]: error,
      }));
    }
  };

  const handleSalaryChange = (e) => {
    const { name, value } = e.target;
    setSalary((prevSalary) => ({
      ...prevSalary,
      [name]: value,
    }));
    handleValidation(value, name);
  };

  const Submit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    const timelineString = `${timeLine.startYear}-${timeLine.endYear}`;
    const salaryString = `$${salary.minSalary} - $${salary.maxSalary}`;
    const countryName = country.label;

    const data = new FormData();
    data.append('totalExperience', `${totalExperience} years`);
    data.append('timeLine', timelineString);
    data.append('title', title);
    data.append('range', range);
    data.append('city', city);
    data.append('country', countryName);
    data.append('dateOfBirth', dateOfBirth);
    data.append('firstName', firstName);
    data.append('lastName', lastName);
    data.append('email', email);
    data.append('occupation', occupation);
    data.append('mobileNumber', phone);
    data.append('address', address);
    data.append('location', location);
    data.append('indroduction', indroduction);
    data.append('role', role);
    data.append('salary', salaryString);
    data.append('description', description);
    data.append('companyName', companyName);

    if (cv) data.append('cv', cv);
    if (logo) data.append('logo', logo);
    if (profilePhoto) data.append('profilePhoto', profilePhoto);
    if (banner) data.append('banner', banner);

    const skillsArray = [];
    skills.forEach((skill, index) => {
      skillsArray.push({ title: skill.title, range: skill.range });
    });

    data.append('skills', JSON.stringify(skillsArray));

    for (let pair of data.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await axios.post(
        'http://localhost:8001/candidate/submit',
        data,
      );
      toast.success('Profile submitted successfully!');

      console.log('Response:', response.data);

      await validationSchema.validate(
        { totalExperience, timeLine: timelineString },
        { abortEarly: false },
      );
      toast.success('Profile submitted successfully!');
    } catch (err) {
      console.error('Error during submission:', err);

      if (err.response) {
        if (err.response.status === 409) {
          toast.error('Email or mobile number already in use.');
        } else if (err.response.status === 400) {
          toast.error('Invalid data submitted.');
        }
      } else if (err.request) {
        toast.error('Network error. Please try again later.');
      }
    }
  };

  const options = countryList().getData();

  const handleAddSkill = () => {
    setSkills([...skills, { title: '', range: '' }]);
  };

  const handleSkillChange = (index, field, value) => {
    const newSkills = [...skills];
    newSkills[index][field] = value;
    setSkills(newSkills);
  };

  const handleRemoveSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTimeLine((prev) => ({ ...prev, [name]: value }));
  };

  const handleCvChange = (event) => {
    const file = event.target.files[0];
    console.log('Selected CV file:', file);
    if (file) {
      setCv(file);
    }
  };

  const handleBannerChange = (e) => {
    const selectedBanner = e.target.files[0];
    if (selectedBanner) {
      setBanner(selectedBanner);
      setBannerFile(URL.createObjectURL(selectedBanner));
    }
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    console.log('Selected Logo file:', file);
    if (file) {
      setLogo(file);
      setLogoFile(URL.createObjectURL(file));
    }
  };

  const handleProfilePhotoChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log('Selected Profile Photo file:', selectedFile);
    if (selectedFile) {
      setProfilePhoto(selectedFile);
      setProfileFile(URL.createObjectURL(selectedFile));
    }
  };

  const handlesalaryChange = (e) => {
    const { name, value } = e.target;
    setSalary((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const changeHandler = (selectedOption) => {
    setCountry(selectedOption);
  };
  return (
    <>
      <NavbarDark />
      <section className='section'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='position-relative'>
                <div className='candidate-cover'>
                  <div className='profile-banner relative text-transparent'>
                    <input
                      id='pro-banner'
                      type='file'
                      onChange={handleBannerChange}
                      style={{ display: 'none' }}
                    />
                    <div className='relative shrink-0'>
                      <img
                        src={bannerFile || banner}
                        className='rounded shadow'
                        id='profile-banner'
                        alt='Banner'
                      />
                      <label
                        className='profile-image-label'
                        htmlFor='pro-banner'
                      >
                        <span className='btn btn-icon btn-sm btn-pills btn-primary'>
                          <FiCamera className='icons' />
                        </span>
                      </label>
                    </div>
                  </div>

                  <form onSubmit={Submit} className='position-relative'>
                    <input
                      type='file'
                      onChange={handleProfilePhotoChange}
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        opacity: '0.01',
                        zIndex: '11',
                      }}
                    />
                    <div className='position-relative d-inline-block'>
                      <img
                        src={profileFile || 'default-profile-image-url'}
                        className='avatar avatar-medium img-thumbnail rounded-pill shadow-sm'
                        id='profile-image'
                        alt='Profile'
                      />
                      <label
                        className='icons position-absolute bottom-0 end-0'
                        htmlFor='pro-img'
                      >
                        <span className='btn btn-icon btn-sm btn-pills btn-primary'>
                          <FiCamera className='icons' />
                        </span>
                      </label>
                    </div>
                  </form>

                  <div className='ms-2'>
                    <h5 className='mb-0'>Mr. Calvin Carlo</h5>
                    <p className='text-muted mb-0'>Web Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {generalError && (
            <div className='alert alert-danger' role='alert'>
              {generalError}
            </div>
          )}
          <form onSubmit={Submit} className='position-relative'>
            <div className='container'>
              <div className='row'>
                <div className='col-12'>
                  <div className='rounded shadow p-4'>
                    <h5>Personal Detail :</h5>
                    <div className='row mt-4'>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                            First Name<span className='text-danger'>*</span>
                          </label>
                          <input
                            name='firstName'
                            id='firstName'
                            type='text'
                            className='form-control'
                            placeholder='First Name:'
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                            Last Name<span className='text-danger'>*</span>
                          </label>
                          <input
                            name='lastName'
                            id='lastName'
                            type='text'
                            className='form-control'
                            placeholder='Last Name:'
                            onChange={(e) => setLastName(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                            Email<span className='text-danger'>*</span>
                          </label>
                          <input
                            name='email'
                            id='email'
                            type='email'
                            className='form-control'
                            placeholder='Email:'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className='col-lg-12'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                            Phone No. :
                          </label>
                          <PhoneInput
                            country={'eg'}
                            enableSearch={true}
                            value={phone}
                            onChange={(phone) => setPhone(phone)}
                          />
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                            Occupation<span className='text-danger'>*</span>
                          </label>
                          <input
                            name='occupation'
                            id='occupation'
                            type='text'
                            className='form-control'
                            placeholder='Occupation:'
                            onChange={(e) => setOccupation(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                            Date of Birth<span className='text-danger'>*</span>
                          </label>
                          <input
                            name='dateOfBirth'
                            id='dateOfBirth'
                            type='date'
                            className='form-control'
                            placeholder='Date of Birth:'
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                            Country<span className='text-danger'>*</span>
                          </label>
                          <Select
                            options={options}
                            value={country}
                            onChange={changeHandler}
                            placeholder='Select a country'
                            className='form-control'
                          />
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                            City<span className='text-danger'>*</span>
                          </label>
                          <input
                            name='city'
                            id='city'
                            type='text'
                            className='form-control'
                            placeholder='City:'
                            onChange={(e) => setCity(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                            Address<span className='text-danger'>*</span>
                          </label>
                          <input
                            name='address'
                            id='address'
                            type='text'
                            className='form-control'
                            placeholder='Address:'
                            onChange={(e) => setAddress(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Salary Range <span className='text-danger'>*</span>
                        </label>
                        <div className='d-flex'>
                          <input
                            type='number'
                            name='minSalary'
                            className={`form-control me-2 ${errorsalary.minSalary ? 'is-invalid' : ''}`}
                            placeholder='Minimum Salary'
                            value={salary.minSalary}
                            onChange={handleSalaryChange}
                            min='0'
                            required
                          />
                          <input
                            type='number'
                            name='maxSalary'
                            className={`form-control ${errorsalary.maxSalary ? 'is-invalid' : ''}`}
                            placeholder='Maximum Salary'
                            value={salary.maxSalary}
                            onChange={handleSalaryChange}
                            min='0'
                            required
                          />
                        </div>
                        {errorsalary.minSalary && (
                          <div className='invalid-feedback'>
                            {errorsalary.minSalary}
                          </div>
                        )}
                        {errorsalary.maxSalary && (
                          <div className='invalid-feedback'>
                            {errorsalary.maxSalary}
                          </div>
                        )}
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                            totalExperience
                            <span className='text-danger'>*</span>
                          </label>
                          <input
                            name='totalExperience'
                            id='totalExperience'
                            type='text'
                            className='form-control'
                            placeholder='totalExperience:'
                            value={totalExperience}
                            onChange={(e) => {
                              setTotalExperience(e.target.value);
                              handleValidation(
                                e.target.value,
                                'totalExperience',
                              );
                            }}
                            required
                          />
                          {totalExperienceError && (
                            <div className='text-danger'>
                              {totalExperienceError}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                            Upload CV<span className='text-danger'>*</span>
                          </label>
                          <input
                            type='file'
                            accept='.pdf'
                            className='form-control'
                            onChange={handleCvChange}
                          />
                        </div>
                      </div>

                      <div className='col-md-12'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                            Introduction<span className='text-danger'>*</span>
                          </label>
                          <textarea
                            name='introduction'
                            id='introduction'
                            rows='3'
                            className='form-control'
                            placeholder='Introduction'
                            onChange={(e) => {
                              setIndroduction(e.target.value);
                              handleValidation(e.target.value, 'indroduction');
                            }}
                            required
                          ></textarea>
                          {indroductionError && (
                            <div className='text-danger'>
                              {indroductionError}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <h5>Experience :</h5>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                            Upload Logo<span className='text-danger'>*</span>
                          </label>
                          <input
                            type='file'
                            accept='image/*'
                            className='form-control'
                            onChange={handleLogoChange}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                            companyName<span className='text-danger'>*</span>
                          </label>
                          <input
                            name='companyName'
                            id='companyName'
                            type='text'
                            className='form-control'
                            placeholder='companyName:'
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                            Rol<span className='text-danger'>*</span>
                          </label>
                          <input
                            name='role'
                            id='role'
                            type='text'
                            className='form-control'
                            placeholder='Role:'
                            onChange={(e) => setRole(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                            Location<span className='text-danger'>*</span>
                          </label>
                          <input
                            name='location'
                            id='location'
                            type='text'
                            className='form-control'
                            placeholder='Location:'
                            onChange={(e) => setLocation(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          TimeLine <span className='text-danger'>*</span>
                        </label>
                        <div className='d-flex'>
                          <input
                            type='number'
                            name='startYear'
                            className='form-control me-2'
                            placeholder='Start Year'
                            value={timeLine.startYear}
                            onChange={handleInputChange}
                            min='1900'
                            max={new Date().getFullYear()}
                            required
                          />
                          <input
                            type='number'
                            name='endYear'
                            className='form-control'
                            placeholder='End Year'
                            value={timeLine.endYear}
                            onChange={handleInputChange}
                            min='1900'
                            max={new Date().getFullYear()}
                            required
                          />
                        </div>
                      </div>

                      <div className='col-md-12'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                            description<span className='text-danger'>*</span>
                          </label>
                          <textarea
                            name='description'
                            id='description'
                            rows='3'
                            className='form-control'
                            placeholder='description'
                            onChange={(e) => {
                              setDescription(e.target.value);
                              handleValidation(e.target.value, 'description');
                            }}
                            required
                          ></textarea>
                          {descriptionError && (
                            <div className='text-danger'>
                              {descriptionError}
                            </div>
                          )}
                        </div>
                      </div>
                      <div></div>
                      <h5 className='mb-0'>Skills</h5>
                      {skills.map((skill, index) => (
                        <div key={index} className='row'>
                          <div className='col-md-6'>
                            <div className='mb-3'>
                              <label className='form-label fw-semibold'>
                                Title<span className='text-danger'>*</span>
                              </label>
                              <input
                                name={`title-${index}`}
                                type='text'
                                className='form-control'
                                placeholder='Title'
                                value={skill.title}
                                onChange={(e) =>
                                  handleSkillChange(
                                    index,
                                    'title',
                                    e.target.value,
                                  )
                                }
                                required
                              />
                            </div>
                          </div>

                          <div className='col-md-6'>
                            <div className='mb-3'>
                              <label className='form-label fw-semibold'>
                                Range<span className='text-danger'>*</span>
                              </label>
                              <input
                                name={`range-${index}`}
                                type='text'
                                className='form-control'
                                placeholder='Range'
                                value={skill.range}
                                onChange={(e) =>
                                  handleSkillChange(
                                    index,
                                    'range',
                                    e.target.value,
                                  )
                                }
                                required
                              />
                            </div>
                          </div>
                          <div className='col-md-12 text-end'>
                            <button
                              type='button'
                              className='bi bi-trash'
                              id='trash'
                              onClick={() => handleRemoveSkill(index)}
                            ></button>
                          </div>
                        </div>
                      ))}
                      <div className='text-center'>
                        <button
                          type='button'
                          id='plus'
                          className='bi bi-plus'
                          onClick={handleAddSkill}
                        ></button>
                      </div>
                    </div>

                    <div className='text-center'>
                      <button type='submit' className='btn btn-primary mt-2'>
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <ToastContainer />
        </div>
      </section>
      <Footer />
      <ScrollTop />
    </>
  );
}
