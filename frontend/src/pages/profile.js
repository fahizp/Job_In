import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import image1 from '../assets/images/team/01.jpg';
import { toast, ToastContainer } from 'react-toastify';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import 'react-phone-input-2/lib/bootstrap.css';
import NavbarDark from '../components/navbarDark';
import Footer from '../components/footer';
import ScrollTop from '../components/scrollTop';
import { UserContext } from '../context/UserContext';
import { FiCamera } from '../assets/icons/vander';
import Deleteaccount from '../components/delete';
import ResetPassword from '../components/reset_password';
import Contactinfo from '../components/contactInfo';

export default function Profile() {
  const { userId } = useContext(UserContext);
  const [file, setFile] = useState(null);
  const [bannerfile, setBannerfile] = useState(null);
  const [username, setUsername] = useState('');
  const [occupation, setOccupation] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const [phone, setPhone] = useState('');

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
    data.append('occupation', occupation);
    data.append('mobile', phone);

    if (file) {
      data.append('profilePhoto', file);
    }
    if (bannerfile) {
      data.append('banner', bannerfile);
    }

    try {
      const response = await axios.post(
        `http://localhost:8001/profile/updateDetails/${userId}`,
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      toast.success(response.data.message || 'Profile updated successfully');
    } catch (err) {
      console.error('Error:', err);
      toast.error(err.response?.data?.message || 'An error occurred');
    }
  };

  useEffect(() => {
    const fetchCandidateProfile = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(
          `http://localhost:8001/profile/userdetail/${userId}`,
        );
        console.log('Fetched user details:', response.data);

        setUserDetails(response.data['user details']);
      } catch (err) {
        console.error('Error fetching candidate details:', err);
      }
    };

    fetchCandidateProfile();
  }, [userId]);
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
                        src={
                          bannerfile
                            ? URL.createObjectURL(bannerfile)
                            : userDetails.banner
                        }
                        className='rounded shadow'
                        id='profile-banner'
                        alt='Profile Banner'
                      />
                      <label
                        className='profile-image-label'
                        htmlFor='pro-banner'
                      ></label>
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
                        src={
                          file
                            ? URL.createObjectURL(file)
                            : userDetails.profilePhoto
                        }
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
                  </div>

                  <div className='ms-m'>
                    <h5 className='mb-0'>{userDetails.name || 'User'}</h5>
                    <p className='text-muted mb-0'>
                      {userDetails.occupation || 'occupation'}
                    </p>
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
                          Occupation:
                        </label>
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
                    <h6 className="web">Number : <span>+{userDetails.mobile || 'N/A'}</span></h6>
                    <div className='col-lg-12 mb-3'>
                      <PhoneInput
                        country={'eg'}
                        className='mb-4'
                        enableSearch={true}
                        value={phone}
                        onChange={(phone) => setPhone(phone)}
                      />
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
                  <ResetPassword />
                  <Deleteaccount />
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
