import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";



import NavbarDark from "../components/navbarDark";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";

import {
  FiMail,
  FiGift,
  FiHome,
  FiMapPin,
  FiGlobe,
  FiPhone,
 
  FiDownload,
  FiFileText
} from "../assets/icons/vander";

export default function CandidateProfile() {
  const [details, setDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCandidateProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/candidate/candidatedetail/${id}`);
        setDetails(response.data);
      } catch (err) {
        console.error("Error fetching candidate details:", err);
      }
    };

    fetchCandidateProfile();
  }, [id]);

  if (!details) return <p>Loading...</p>;

  return (
    <>
      <NavbarDark />
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="position-relative">
                <div className="candidate-cover">
                  <img src={details.banner} className="img-fluid rounded shadow" alt="background" />
                </div>
                <div className="candidate-profile d-flex align-items-end justify-content-between mx-2">
                  <div className="d-flex align-items-end">
                    <img
                      src={details.profilePhoto}
                      className="rounded-pill shadow border border-3 avatar avatar-medium"
                      alt="candidate"
                    />
                    <div className="ms-2">
                      <h5 className="mb-0">Mr. {details.firstName} {details.lastName}</h5>
                      <p className="text-muted mb-0">{details.occupation}</p>
                    </div>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-4">
          <div className="row g-4">
            <div className="col-lg-8 col-md-7 col-12">
              <h5 className="mb-4">Introduction:</h5>
              <p className="text-muted">{details.indroduction}</p>

              <h5 className="mt-4">Skills:</h5>
              <div className="row">
                {details.skills.map((skill, index) => (
                  <div className="col-lg-6 col-12" key={index}>
                    <div className="progress-box mt-4">
                      <h6 className="font-weight-normal">{skill.title}</h6>
                      <div className="progress">
                        <div className="progress-bar position-relative bg-primary" style={{ width: skill.range }}>
                          <div className="progress-value d-fblock  text-dark h6">{skill.range}%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h5 className="mt-4">Experience:</h5>
              <div className="row">
                {details.experience.map((exp, index) => (
                  <div className="col-12 mt-4" key={index}>
                    <div className="d-flex">
                      <div className="text-center">
                        <img src={exp.logo} className="avatar avatar-small bg-white shadow p-2 rounded" alt={exp.companyName} />
                        <h6 className="text-muted mt-2 mb-0">{exp.timeLine}</h6>
                      </div>
                      <div className="ms-3">
                        <h6 className="mb-0">{exp.role}</h6>
                        <p className="text-muted">{exp.companyName} - {exp.location}</p>
                        <p className="text-muted mb-0">{exp.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded shadow mt-4">
                <h5>Get in touch !</h5>
                <form className="mt-4">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Your Name <span className="text-danger">*</span></label>
                        <input name="name" id="name" type="text" className="form-control" placeholder="Name :" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Your Email <span className="text-danger">*</span></label>
                        <input name="email" id="email" type="email" className="form-control" placeholder="Email :" />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Subject</label>
                        <input name="subject" id="subject" className="form-control" placeholder="Subject :" />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Comments <span className="text-danger">*</span></label>
                        <textarea name="comments" id="comments" rows="4" className="form-control" placeholder="Message :"></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="d-grid">
                        <button type="submit" id="submit" name="send" className="btn btn-primary">Send Message</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-4 col-md-5 col-12">
              <div className="card bg-light p-4 rounded shadow sticky-bar">
                <h5 className="mb-0">Personal Detail:</h5>
                <div className="mt-3">
                  <div className="d-flex align-items-center justify-content-between mt-3">
                    <span className="d-inline-flex align-items-center text-muted fw-medium"><FiMail className="fea icon-sm me-2" /> Email:</span>
                    <span className="fw-medium">{details.email}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-3">
                    <span className="d-inline-flex align-items-center text-muted fw-medium"><FiGift className="fea icon-sm me-2" /> D.O.B.:</span>
                    <span className="fw-medium">{details.dateOfBirth}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-3">
                    <span className="d-inline-flex align-items-center text-muted fw-medium"><FiHome className="fea icon-sm me-2" /> Address:</span>
                    <span className="fw-medium">{details.address}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-3">
                    <span className="d-inline-flex align-items-center text-muted fw-medium"><FiMapPin className="fea icon-sm me-2" /> City:</span>
                    <span className="fw-medium">{details.city}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-3">
                    <span className="d-inline-flex align-items-center text-muted fw-medium"><FiGlobe className="fea icon-sm me-2" /> Country:</span>
                    <span className="fw-medium">{details.country}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-3">
                    <span className="d-inline-flex align-items-center text-muted fw-medium"><FiPhone className="fea icon-sm me-2" /> Mobile:</span>
                    <span className="fw-medium">{details.mobileNumber}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-3">
                                    
                                    
                                </div>

                                <div className="p-3 rounded shadow bg-white mt-2">
                                    <div className="d-flex align-items-center mb-2">
                                        <FiFileText className="fea icon-md"/>
                                        <h6 className="mb-0 ms-2">{details.firstName}-{details.lastName}-resume.pdf</h6>
                                    </div>

                                    <Link to={details.cv} download="pdf" target='_blank' className="btn btn-primary w-100"><FiDownload className="fea icon-sm me-1"/> Download CV</Link>
                                </div>
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
