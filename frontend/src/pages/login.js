import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from '@react-oauth/google';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import bg1 from '../assets/images/hero/bg3.jpg';
import logo from '../assets/images/logo-dark.png';
import { UserContext } from '../context/UserContext';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .matches(
            /^(?=.*[a-zA-Z])(?=.*[0-9])/,
            "Password must contain both letters and numbers"
        )
        .required("Password is required"),
    termsAccepted: Yup.boolean()
        .oneOf([true], 'You must accept the terms and conditions')
        .required('You must accept the terms and conditions')
});

export default function Login() {
    const navigate = useNavigate();
    const { setUserId } = useContext(UserContext);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const accessToken = localStorage.getItem('accessToken');
        if (userId) {
            setUserId(userId);
        }

        if (accessToken) {
            navigate('/index');
        }
    }, [navigate, setUserId]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post("http://localhost:8001/auth/login", {
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
        } catch (error) {
            console.error("Login failed:", error.response?.data?.message || error.message);
            toast.error("Invalid login credentials");
        } finally {
            setSubmitting(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await axios.post('http://localhost:8001/auth/google', {
                token: credentialResponse.credential,
            });

            const { accessToken, userId } = response.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("userId", userId);
            setUserId(userId); // Update context with user ID
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
        <>
            <ToastContainer />
            <section className="bg-home d-flex align-items-center" style={{ backgroundImage: `url(${bg1})`, backgroundPosition: 'center' }}>
                <div className="bg-overlay bg-linear-gradient-2"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-5 col-12">
                            <div className="p-4 bg-white rounded shadow-md mx-auto w-100" style={{ maxWidth: '400px' }}>
                                <Formik
                                    initialValues={{ email: '', password: '', termsAccepted: false }}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <Link to="/"><img src={logo} className="mb-4 d-block mx-auto" alt="Logo" /></Link>
                                            <h6 className="mb-3 text-uppercase fw-semibold">Please sign in</h6>

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
                                                    id="termsAndConditions"
                                                    name="termsAccepted"
                                                />
                                                <label className="form-check-label text-muted" htmlFor="termsAndConditions">
                                                    I accept the <Link to="#" className="text-primary">terms and conditions</Link>
                                                </label>
                                                <ErrorMessage name="termsAccepted" component="div" className="text-danger small" />
                                            </div>

                                            <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting}>
                                                {isSubmitting ? "Signing in..." : "Sign in"}
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
                                                    <span className="text-muted me-2 small">Don't have an account?</span>
                                                    <Link to="/signup" className="text-dark fw-semibold small">Sign Up</Link>
                                                </span>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
