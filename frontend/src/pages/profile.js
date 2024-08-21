import React, { useState, useContext } from 'react';
import axios from 'axios';
import image1 from '../assets/images/team/01.jpg';
import { toast, ToastContainer } from 'react-toastify';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import NavbarDark from '../components/navbarDark';
import Footer from '../components/footer';
import ScrollTop from '../components/scrollTop';
import { UserContext } from '../context/UserContext';
import { FiCamera } from '../assets/icons/vander';

export default function Profile() {
  const { userId } = useContext(UserContext);
  const [file, setFile] = useState(null);
  const [bannerfile, setBannerfile] = useState(null);
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [occupation, setOccupation] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleBannerChange(e) {
    setBannerfile(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('username', username);
    data.append('location', location);
    data.append('occupation', occupation);
    if (file) {
      data.append('profilePhoto', file);
    }
    if (bannerfile) {
      data.append('bannerPhoto', bannerfile);
    }

    try {
      const response = await axios.post(
        `http://localhost:8001/profile/updateDetails/${userId}`,
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      toast.success(response.data.message || 'Profile updated successfully');
    } catch (err) {
      console.error('Error:', err);
      toast.error(err.response?.data?.message || 'An error occurred');
    }
  };
  const contactSubmit = async (e) => {
    e.preventDefault();
    
    const contactdata = {
      mobile: phone,
      website: website
    };
  
    try {
      const response = await axios.post(
        `http://localhost:8001/profile/ContactInfo/${userId}`,
        contactdata,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      toast.success(response.data.message || 'Contact info updated successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'An error occurred.');
    }
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
                    <input id='pro-banner' type='file' onChange={handleBannerChange} style={{ display: 'none' }} />
                    <div className='relative shrink-0'>
                      <img
                        src={bannerfile ? URL.createObjectURL(bannerfile) : image1}
                        className='rounded shadow'
                        id='profile-banner'
                        alt='Profile Banner'
                      />
                      <label className='profile-image-label' htmlFor='pro-banner'></label>
                    </div>
                  </div>
                </div>
                <div className='candidate-profile d-flex align-items-end mx-2'>
                  <div className='position-relative'>
                    <input
                      type='file'
                      onChange={handleChange}
                      style={{ display: 'none' }}
                      id='pro-img'
                    />
                    <div className='position-relative d-inline-block'>
                      <img
                        src={file ? URL.createObjectURL(file) : image1}
                        className='avatar avatar-medium img-thumbnail rounded-pill shadow-sm'
                        id='profile-image'
                        alt='Profile'
                      />
                      <label className='icons position-absolute bottom-0 end-0' htmlFor='pro-img'>
                        <span className='btn btn-icon btn-sm btn-pills btn-primary'>
                          <FiCamera className='icons' />
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className='ms-m'>
                    <h5 className='mb-0'>{userId}</h5>
                    <p className='text-muted mb-0'>Web Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='rounded shadow p-4'>
                <form onSubmit={handleSubmit}>
                  <h5>Personal Details:</h5>
                  <div className='row mt-4'>
                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Name:<span className='text-danger'>*</span>
                        </label>
                        <input
                          name='username'
                          id='username'
                          type='text'
                          className='form-control'
                          placeholder='Name:'
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Location:<span className='text-danger'>*</span>
                        </label>
                        <input
                          name='location'
                          id='location'
                          type='text'
                          className='form-control'
                          placeholder='Location:'
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>Occupation:</label>
                        <input
                          name='occupation'
                          id='occupation'
                          type='text'
                          className='form-control'
                          placeholder='Occupation:'
                          value={occupation}
                          onChange={(e) => setOccupation(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className='col-12'>
                      <button
                        type='submit'
                        id='submit'
                        name='send'
                        className='submitBtn btn btn-primary'
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className='rounded shadow p-4 mt-4'>
                <div className='row'>
                  <div className='col-md-6 mt-4 pt-2'>
                    <h5>Contact Info :</h5>
                    <form onSubmit={contactSubmit}>
  <div className='row mt-4'>
    <div className='col-lg-12'>
      <div className='mb-3'>
        <label className='form-label fw-semibold'>Phone No. :</label>
        <PhoneInput
          country={'eg'}
          enableSearch={true}
          value={phone}
          onChange={(phone) => setPhone(phone)}
        />
      </div>
    </div>

    <div className='col-lg-12'>
      <div className='mb-3'>
        <label className='form-label fw-semibold'>Website :</label>
        <input
          name='url'
          id='url'
          type='url'
          className='form-control'
          placeholder='Url :'
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
    </div>

    <div className='col-lg-12 mt-2 mb-0'>
      <button type='submit' className='btn btn-primary'>
        Add
      </button>
    </div>
  </div>
</form>

                  </div>

                  <div className='col-md-6 mt-4 pt-2'>
                    <h5>Change password :</h5>
                    <form>
                      <div className='row mt-4'>
                        <div className='col-lg-12'>
                          <div className='mb-3'>
                            <label className='form-label fw-semibold'>Old password :</label>
                            <input
                              type='password'
                              className='form-control'
                              placeholder='Old password'
                              required
                            />
                          </div>
                        </div>

                        <div className='col-lg-12'>
                          <div className='mb-3'>
                            <label className='form-label fw-semibold'>New password :</label>
                            <input
                              type='password'
                              className='form-control'
                              placeholder='New password'
                              required
                            />
                          </div>
                        </div>

                        <div className='col-lg-12'>
                          <div className='mb-3'>
                            <label className='form-label fw-semibold'>
                              Confirm new password :
                            </label>
                            <input
                              type='password'
                              className='form-control'
                              placeholder='Confirm new password'
                              required
                            />
                          </div>
                        </div>

                        <div className='col-lg-12 mt-2 mb-0'>
                          <button type='submit' className='btn btn-primary'>
                            Change password
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <ScrollTop />
      <ToastContainer />
    </>
  );
}
