import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoogleAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/auth/login/success", { withCredentials: true });
      setUser(data.user);
      if (data.user) {
        navigate('/candidate-profile/:id');
      }
    } catch (error) {
      console.error('Error fetching user data:', error.response?.data);
    }
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:8000/auth/google", "_self");
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
