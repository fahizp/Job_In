import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import bg1 from '../assets/images/hero/bg.jpg';
import contact from '../assets/images/svg/contact.svg';

import { contactData } from '../data/data';

import Navbar from '../components/navbar';
import Footer from '../components/footer';
import ScrollTop from '../components/scrollTop';

export default function ContactUs() {
  const [yourname, setYourname] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!yourname || !email || !message) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    const contactdata = {
      yourname,
      email,
      subject,
      message,
    };

    try {
      await axios.post(
        'http://localhost:8001/profile/contactUs/sendemail',
        contactdata,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setSuccess('Your message has been sent successfully!');
      setYourname('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setError('An error occurred while sending your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar navClass="defaultscroll sticky" navLight={true} />

      <section
        className="bg-half-170 d-table w-100"
        style={{ backgroundImage: `url(${bg1})`, backgroundPosition: 'top' }}
      >
        <div className="bg-overlay bg-gradient-overlay"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <p className="text-white-50 para-desc mx-auto mb-0">
                  Get in touch!
                </p>
                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">
                  Contact us
                </h5>
              </div>
            </div>
          </div>

          <div className="position-middle-bottom">
            <nav aria-label="breadcrumb" className="d-block">
              <ul className="breadcrumb breadcrumb-muted mb-0 p-0">
                <li className="breadcrumb-item">
                  <Link to="/">job_in</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Contact us
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <div className="position-relative">
        <div className="shape overflow-hidden text-white">
          <svg
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>

      <section className="section pb-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img src={contact} className="img-fluid" alt="contact us" />
            </div>
            <div className="col-md-6">
              <div className="p-4 rounded shadow ms-lg-5">
                <h4>Get in touch!</h4>
                <form onSubmit={formSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Your Name <span className="text-danger">*</span>
                        </label>
                        <input
                          name="name"
                          id="name"
                          type="text"
                          className="form-control"
                          placeholder="Name :"
                          value={yourname}
                          onChange={(e) => setYourname(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Your Email <span className="text-danger">*</span>
                        </label>
                        <input
                          name="email"
                          id="email"
                          type="email"
                          className="form-control"
                          placeholder="Email :"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Subject</label>
                        <input
                          name="subject"
                          id="subject"
                          className="form-control"
                          placeholder="Subject :"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Comments <span className="text-danger">*</span>
                        </label>
                        <textarea
                          name="comments"
                          id="comments"
                          rows="4"
                          className="form-control"
                          placeholder="Message :"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  {error && <p className="text-danger">{error}</p>}
                  {success && <p className="text-success">{success}</p>}
                  <div className="row">
                    <div className="col-12">
                      <div className="d-grid">
                        <button
                          type="submit"
                          id="submit"
                          name="send"
                          className="btn btn-primary"
                          disabled={loading}
                        >
                          {loading ? 'Sending...' : 'Send Message'}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-100 mt-60">
          <div className="row g-4">
            {contactData.map((item, index) => {
              let Icon = item.icon;
              return (
                <div className="col-md-4" key={index}>
                  <div className="position-relative features text-center mx-lg-4 px-md-1">
                    <div className="feature-icon bg-soft-primary rounded shadow mx-auto position-relative overflow-hidden d-flex justify-content-center align-items-center">
                      <Icon className="fea icon-ex-md" />
                    </div>

                    <div className="mt-4">
                      <h5 className="mb-3">{item.title}</h5>
                      <p className="text-muted">{item.desc}</p>
                      <Link to={item.link} className="text-primary">
                        {item.link}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="container-fluid mt-100 mt-60">
          <div className="row">
            <div className="col-12 p-0">
              <div className="card map border-0">
                <div className="card-body p-0">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin"
                    title="job_in"
                    style={{ border: 0 }}
                    className="rounded"
                    allowFullScreen=""
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollTop />
    </>
  );
}
