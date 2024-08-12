import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import bg1 from '../assets/images/hero/bg3.jpg';
import logo from '../assets/images/logo-dark.png';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && accessToken !== 'undefined') {
      navigate('/index');
    } else if (accessToken === 'undefined') {
      navigate('/');
    }
  }, [navigate]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])/,
        'username must contain both letters and numbers',
      )
      .required('name is required'),

    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])/,
        'Password must contain both letters and numbers',
      )
      .required('Password is required'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(
        { name, email, password },
        { abortEarly: false },
      );

      const response = await axios.post('http://localhost:8001/auth/signup', {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        localStorage.setItem('accessToken', response.data.ACCESS_TOKEN);
        navigate('/index');
      }
    } catch (err) {
      if (err.name === 'ValidationError') {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: 'Error signing up. Please try again.',
        }));
      }
    }
  };

  return (
    <section
      className='bg-home d-flex align-items-center'
      style={{ backgroundImage: `url(${bg1})`, backgroundPosition: 'center' }}
    >
      <div className='bg-overlay bg-linear-gradient-2'></div>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-4 col-md-5 col-12'>
            <div
              className='p-4 bg-white rounded shadow-md mx-auto w-100'
              style={{ maxWidth: '400px' }}
            >
              <form onSubmit={handleSubmit}>
                <Link to='/'>
                  <img src={logo} className='mb-4 d-block mx-auto' alt='Logo' />
                </Link>
                <h6 className='mb-3 text-uppercase fw-semibold'>
                  Register your account
                </h6>

                {errors.general && (
                  <p className='text-danger'>{errors.general}</p>
                )}

                <div className='mb-3'>
                  <label className='form-label fw-semibold'>Your Name</label>
                  <input
                    name='name'
                    id='name'
                    type='text'
                    className='form-control'
                    placeholder='Calvin Carlo'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && (
                    <div className='text-danger small'>{errors.name}</div>
                  )}
                </div>

                <div className='mb-3'>
                  <label className='form-label fw-semibold'>Your Email</label>
                  <input
                    name='email'
                    id='email'
                    type='email'
                    className='form-control'
                    placeholder='example@website.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <div className='text-danger small'>{errors.email}</div>
                  )}
                </div>

                <div className='mb-3'>
                  <label className='form-label fw-semibold' htmlFor='loginpass'>
                    Password
                  </label>
                  <input
                    type='password'
                    className='form-control'
                    id='loginpass'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <div className='text-danger small'>{errors.password}</div>
                  )}
                </div>

                <div className='form-check mb-3'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    value=''
                    id='flexCheckDefault'
                  />
                  <label
                    className='form-label form-check-label text-muted'
                    htmlFor='flexCheckDefault'
                  >
                    I Accept{' '}
                    <Link to='#' className='text-primary'>
                      Terms And Conditions
                    </Link>
                  </label>
                </div>

                <button className='btn btn-primary w-100' type='submit'>
                  Register
                </button>

                <div className='col-12 text-center mt-3'>
                  <span>
                    <span className='text-muted small me-2'>
                      Already have an account?{' '}
                    </span>
                    <Link to='/' className='text-dark fw-semibold small'>
                      Sign in
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
