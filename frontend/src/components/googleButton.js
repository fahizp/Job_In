import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoogleAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/index"); 
    } else {
      getUser();
    }
  }, [navigate]);

  const getUser = async () => {
    try {
        const { data } = await axios.get("http://localhost:8001/auth/login/success", { withCredentials: true });
        if (data.user) {
            setUser(data.user);
            localStorage.setItem("accessToken", data.accessToken);
            navigate(`/candidate-profile/${data.user._id}`);
        } else {
            navigate("/");
        }
    } catch (error) {
        console.error('Error fetching user data:', error.response?.data);
        navigate("/");
    }
};


  const handleGoogleLogin = () => {
    window.open("http://localhost:8001/auth/google", "_self");
  };

  if (user) {
    return null; 
  }

  return (
    <div className="d-flex justify-content-center mt-5">
      <button className="btn btn-primary" onClick={handleGoogleLogin}>
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleAuth;
