import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from '@react-oauth/google';
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import bg1 from '../assets/images/hero/bg3.jpg';
import logo from '../assets/images/logo-dark.png';
import { UserContext } from '../context/UserContext';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [generalError, setGeneralError] = useState(""); 
    const navigate = useNavigate();
    const { setUserId } = useContext(UserContext);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            navigate('/index');
        }
    }, [navigate]);

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

    useEffect(() => {
        validationSchema.validateAt('email', { email })
            .then(() => setEmailError(''))
            .catch(err => setEmailError(err.message));
    }, [email]);

    useEffect(() => {
        validationSchema.validateAt('password', { password })
            .then(() => setPasswordError(''))
            .catch(err => setPasswordError(err.message));
    }, [password]);

   

    const handleSubmit = async (event) => {
        event.preventDefault();
        setGeneralError(""); 

        try {
            await validationSchema.validate(
                { email, password, termsAccepted },
                { abortEarly: false },
            );

            const response = await axios.post("http://localhost:8001/auth/login", {
                email,
                password,
            });

            localStorage.setItem("accessToken", response.data.ACCESS_TOKEN);
            setUserId(response.data.userId);
            toast.success("Login successful!");
            navigate("/index");

        } catch (error) {
            if (error.name === "ValidationError") {
                if (error.errors.includes("Password must contain both letters and numbers")) {
                    setGeneralError("Password must contain both letters and numbers");
                } else {
                    setGeneralError("Invalid email or password");
                }
            } else {
                console.error("Login failed:", error.response?.data?.message || error.message);
                setGeneralError("Invalid login credentials");
            }
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await axios.post('http://localhost:8001/auth/google', {
                token: credentialResponse.credential,
            });

            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
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
                                <form onSubmit={handleSubmit}>                                  
                                    <Link to="/"><img src={logo} className="mb-4 d-block mx-auto" alt=""/></Link>
                                    <h6 className="mb-3 text-uppercase fw-semibold">Please sign in</h6>

                                    {generalError && <div className="alert alert-danger">{generalError}</div>}

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Your Email</label>
                                        <input
                                            name="email"
                                            id="email"
                                            type="email"
                                            className={`form-control ${emailError ? 'is-invalid' : ''}`}
                                            placeholder="example@website.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        {emailError && <div className="invalid-feedback">{emailError}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold" htmlFor="loginpass">Password</label>
                                        <input
                                            type="password"
                                            className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                                            id="loginpass"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} 
                                        />
                                        {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                                    </div>

                                    <div className="form-check mb-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="termsAndConditions"
                                            checked={termsAccepted}
                                            onChange={(e) => setTermsAccepted(e.target.checked)}
                                        />
                                        <label className="form-check-label text-muted" htmlFor="termsAndConditions">
                                            I accept the <Link to="#" className="text-primary">terms and conditions</Link>
                                        </label>
                                        {generalError && <div className="text-danger small">{generalError}</div>}
                                    </div>

                                    <button className="btn btn-primary w-100" type="submit">Sign in</button>
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
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
