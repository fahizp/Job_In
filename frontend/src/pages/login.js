import React, { useState, useEffect,useContext} from "react";
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
                "Password must contain letters and numbers"
            )
            .required("Password is required"),
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setGeneralError(""); 

    try {
      await validationSchema.validate(
        { email, password },
        { abortEarly: false },
      );

            const response = await axios.post("http://localhost:8001/auth/login", {
                email,
                password,
                
            });
            
            if (response.status === 201) {
                const { userId, ACCESS_TOKEN } = response.data; // Extract userId from response
          
                setUserId(userId); // Set userId in context
                localStorage.setItem("accessToken", ACCESS_TOKEN); // Store token in localStorage
          
                console.log('User ID:', userId); // Log userId to the console
          
                navigate("/index"); // Navigate to the desired page
              } 

        } catch (error) {
            if (error.name === "ValidationError") {
                setGeneralError("Invalid email or password"); 
            } else {
                console.error("Login failed:", error.response?.data?.message || error.message);
                setGeneralError("invalid login credentials");
            }
            toast.error(generalError); 
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
                                            className="form-control"
                                            placeholder="example@website.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold" htmlFor="loginpass">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="loginpass"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} 
                                        />
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <div className="mb-3">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                <label className="form-label form-check-label text-muted" htmlFor="flexCheckDefault">Remember me</label>
                                            </div>
                                        </div>
                                        <span className="forgot-pass text-muted small mb-0">
                                            <Link to="/reset-password" className="text-muted">Forgot password?</Link>
                                        </span>
                                    </div>

                                    <button className="btn btn-primary w-100" type="submit">Sign in</button>

                                    <div className="col-12 text-center mt-3">
                                        <span>
                                            <span className="text-muted me-2 small">Don't have an account?</span>
                                            <Link to="/signup" className="text-dark fw-semibold small">Sign Up</Link>
                                        </span>
                                        <div className="google">
                                            <GoogleLogin  className="gbutton"
                                            onSuccess={handleGoogleSuccess}
                                            onError={handleGoogleFailure}
                                        />
                                        </div>
                                        
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
