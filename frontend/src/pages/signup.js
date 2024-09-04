import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import { GoogleLogin } from '@react-oauth/google';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import bg1 from '../assets/images/hero/bg3.jpg';
import logo from '../assets/images/logo-dark.png';
import { UserContext } from '../context/UserContext';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, 'Name must be at least 3 characters'),
  email: Yup.string()
    .matches(/^[^\s@]+@gmail\.com$/, 'Enter Correct Email Format')
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])/,
      "Password must contain both letters and numbers"
    )
    .required("Password is required"),
  terms: Yup.bool()
    .oneOf([true], 'You must accept the terms and conditions')
});

export default function Signup() {
  const navigate = useNavigate();
  const { setUserId } = useContext(UserContext);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:8001/auth/signup', {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (response.status === 201) {
        const { ACCESS_TOKEN, userId } = response.data;
        localStorage.setItem("accessToken", ACCESS_TOKEN);
        localStorage.setItem("userId", userId);
        setUserId(userId);
        navigate("/index");
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        toast.error('Email already in use');
      } else {
        toast.error("Internal Server Issue");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
        const response = await axios.post('http://localhost:8001/auth/google', {
            token: credentialResponse.credential,
        });

        const { ACCESS_TOKEN, userId } = response.data;
        localStorage.setItem("accessToken", ACCESS_TOKEN);
        localStorage.setItem("userId", userId);
        setUserId(userId); 
        toast.success("Login successful!");
        navigate('/index');
    } catch (error) {
        console.error("Google login failed:", error);
        toast.error("Google login failed. Please try again.");
    }
  };

  const handleGoogleFailure = () => {
    toast.error("Google login failed. Please try again.");
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
            <div className='p-4 bg-white rounded shadow-md mx-auto w-100' style={{ maxWidth: '400px' }}>
              <Formik
                initialValues={{ name: '', email: '', password: '', terms: false }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                validateOnChange={true}  
                validateOnBlur={true}    
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Link to='/'>
                      <img src={logo} className='mb-4 d-block mx-auto' alt='Logo' />
                    </Link>
                    <h6 className='mb-3 text-uppercase fw-semibold'>Register your account</h6>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Your Name</label>
                      <Field
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="Your Name"
                      />
                      <ErrorMessage name="name" component="div" className="text-danger small" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Your Email</label>
                      <Field
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="example@website.com"
                      />
                      <ErrorMessage name="email" component="div" className="text-danger small" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold" htmlFor="loginpass">Password</label>
                      <Field
                        name="password"
                        type="password"
                        className="form-control"
                        id="loginpass"
                        placeholder="Password"
                      />
                      <ErrorMessage name="password" component="div" className="text-danger small" />
                    </div>

                    <div className="form-check mb-3">
                      <Field
                        className="form-check-input"
                        type="checkbox"
                        id="termsCheckbox"
                        name="terms"
                      />
                      <label className="form-label form-check-label text-muted" htmlFor="termsCheckbox">
                        I Accept <Link to="#" className="text-primary">Terms And Conditions</Link>
                      </label>
                      <ErrorMessage name="terms" component="div" className="text-danger small" />
                    </div>

                    <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Registering..." : "Register"}
                    </button>
                    <div className="google mt-3">
                      <GoogleLogin 
                        className="gbutton"
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleFailure}
                      />
                    </div>
                    <div className="col-12 text-center mt-3">
                      <span>
                        <span className="text-muted small me-2">Already have an account? </span>
                        <Link to="/" className="text-dark fw-semibold small">Sign in</Link>
                      </span>
                    </div>
                  </Form>
                )}
              </Formik>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
