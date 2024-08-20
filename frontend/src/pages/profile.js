import React, { useState,useContext} from 'react';

import image1 from '../assets/images/team/01.jpg';
import bg1 from '../assets/images/hero/bg5.jpg';

import NavbarDark from '../components/navbarDark';
import Footer from '../components/footer';
import ScrollTop from '../components/scrollTop';
import { UserContext } from '../context/UserContext';


import { FiCamera } from '../assets/icons/vander';

export default function Profile() {
    const { userId } = useContext(UserContext);

  let [file, setFile] = useState(image1);

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }
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
                    <input id='pro-banner' />
                    <div className='relative shrink-0'>
                      <img
                        src={bg1}
                        className='rounded shadow'
                        id='profile-banner'
                        alt=''
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
                        src={file}
                        className='avatar avatar-medium img-thumbnail rounded-pill shadow-sm'
                        id='profile-image'
                        alt=''
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
                    <h5 className='mb-0'>User ID: {userId}</h5>
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
                <form>
                  <h5>Personal Detail :</h5>
                  <div className='row mt-4'>
                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Name:<span className='text-danger'>*</span>
                        </label>
                        <input
                          name='name'
                          id='name'
                          type='text'
                          className='form-control'
                          placeholder='Name :'
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
                        />
                      </div>
                    </div>

                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label fw-semibold'>
                          Occupation:
                        </label>
                        <input
                          Occupation='Occupation'
                          id='Occupation'
                          type='text'
                          className='form-control'
                          placeholder='Occupation:'
                        />
                      </div>
                    </div>

                    

                    <div className='col-12'>
                      <input
                        type='submit'
                        id='submit2'
                        name='send'
                        className='submitBnt btn btn-primary'
                        value='Save Changes'
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div className='rounded shadow p-4 mt-4'>
                <div className='row'>
                  <div className='col-md-6 mt-4 pt-2'>
                    <h5>Contact Info :</h5>

                    <form>
                      <div className='row mt-4'>
                        <div className='col-lg-12'>
                          <div className='mb-3'>
                            <label className='form-label fw-semibold'>
                              Phone No. :
                            </label>
                            <input
                              name='number'
                              id='number'
                              type='number'
                              className='form-control'
                              placeholder='Phone :'
                            />
                          </div>
                        </div>

                        <div className='col-lg-12'>
                          <div className='mb-3'>
                            <label className='form-label fw-semibold'>
                              Website :
                            </label>
                            <input
                              name='url'
                              id='url'
                              type='url'
                              className='form-control'
                              placeholder='Url :'
                            />
                          </div>
                        </div>

                        <div className='col-lg-12 mt-2 mb-0'>
                          <button className='btn btn-primary'>Add</button>
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
                            <label className='form-label fw-semibold'>
                              Old password :
                            </label>
                            <input
                              type='password'
                              className='form-control'
                              placeholder='Old password'
                              required=''
                            />
                          </div>
                        </div>

                        <div className='col-lg-12'>
                          <div className='mb-3'>
                            <label className='form-label fw-semibold'>
                              New password :
                            </label>
                            <input
                              type='password'
                              className='form-control'
                              placeholder='New password'
                              required=''
                            />
                          </div>
                        </div>

                        <div className='col-lg-12'>
                          <div className='mb-3'>
                            <label className='form-label fw-semibold'>
                              Re-type New password :
                            </label>
                            <input
                              type='password'
                              className='form-control'
                              placeholder='Re-type New password'
                              required=''
                            />
                          </div>
                        </div>

                        <div className='col-lg-12 mt-2 mb-0'>
                          <button className='btn btn-primary'>
                            Save password
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              

              <div className='rounded shadow p-4 mt-4'>
                <form>
                  <h5 className='text-danger'>Delete Account :</h5>
                  <div className='row mt-4'>
                    <h6 className='mb-0'>
                      Do you want to delete the account? Please press below
                      "Delete" button
                    </h6>
                    <div className='mt-4'>
                      <button className='btn btn-danger'>Delete Account</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer top={true} />
      <ScrollTop />
    </>
  );
}
