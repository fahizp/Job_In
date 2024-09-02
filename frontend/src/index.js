import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import './assets/scss/style.scss'
// import './assets/css/materialdesignicons.min.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="228183857364-eddho3ek7jbuo8ojlqdmpt2d6goo3ld1.apps.googleusercontent.com">
  <BrowserRouter>
    <App />
  </BrowserRouter>
</GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();