import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; 


import bg1 from "../assets/images/hero/bg5.jpg"
import company1 from "../assets/images/company/linkedin.png"
import company2 from "../assets/images/company/lenovo-logo.png"
import pdf from "../assets/images/calvin-carlo-resume.pdf"
import image1 from "../assets/images/team/01.jpg"

import NavbarDark from "../components/navbarDark";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";

import { candidateSkill, candidatesData } from "../data/data";
import {
    FiSettings,
    FiMail,
    FiGift,
    FiHome,
    FiMapPin,
    FiGlobe,
    FiPhone,
    FiDribbble,
    FiLinkedin,
    FiFacebook,
    FiInstagram,
    FiTwitter,
    FiDownload,
    FiMessageCircle,
    FiFileText,
} from "../assets/icons/vander";

export default function CandidateProfile() {
    const params = useParams();
    const id = params.id;
    const data = candidatesData.find((candidates) => candidates.id === parseInt(id));

    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:8000/auth/login/success", { withCredentials: true });
            setUser(response.data.user);
        } catch (error) {
            console.error(error.response?.data);
        }
    };

    return (
        <>
            <NavbarDark />
            <section className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="position-relative">
                                <div className="candidate-cover">
                                    <img src={bg1} className="img-fluid rounded shadow" alt="" />
                                </div>
                                {user ? (
                                    <div className="candidate-profile d-flex align-items-end justify-content-between mx-2">
                                        <div className="d-flex align-items-end">
                                            <img
                                                src={user.profilePic}
                                                alt="Profile"
                                                referrerPolicy="no-referrer"
                                                className="rounded-pill shadow border border-3 avatar avatar-medium"
                                            />
                                            <div className="ms-2">
                                                <h5 className="mb-0">Mr. {user.name}</h5>
                                                <p className="text-muted mb-0">{data?.post ? data.post : 'Web Designer'}</p>
                                            </div>
                                        </div>
                                        <Link to="/candidate-profile-setting" className="btn btn-sm btn-icon btn-pills btn-soft-primary">
                                            <FiSettings className="icons" />
                                        </Link>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mt-4">
                    <div className="row g-4">
                        <div className="col-lg-8 col-md-7 col-12">
                            <h5 className="mb-4">Introduction:</h5>
                            <p className="text-muted">
                                Obviously, I am a Web Developer with over 3 years of experience. Experienced with all stages of the development cycle for dynamic web projects. The as opposed to using 'Content here, content here', making it look like readable English.
                            </p>
                            <p className="text-muted">
                                Data Structures and Algorithms are the heart of programming. Initially, most developers do not realize their importance, but when you start your career in software development, you will find your code is either taking too much time or taking too much space.
                            </p>

                            <h5 className="mt-4">Skills:</h5>
                            <div className="row">
                                <div className="col-lg-6 col-12">
                                    {candidateSkill.slice(0, 3).map((item, index) => (
                                        <div className="progress-box mt-4" key={index}>
                                            <h6 className="font-weight-normal">{item.title}</h6>
                                            <div className="progress">
                                                <div className="progress-bar position-relative bg-primary" style={{ width: item.value }}>
                                                    <div className="progress-value d-block text-dark h6">{item.value}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="col-lg-6 col-12">
                                    {candidateSkill.slice(3, 6).map((item, index) => (
                                        <div className="progress-box mt-4" key={index}>
                                            <h6 className="font-weight-normal">{item.title}</h6>
                                            <div className="progress">
                                                <div className="progress-bar position-relative bg-primary" style={{ width: item.value }}>
                                                    <div className="progress-value d-block text-dark h6">{item.value}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <h5 className="mt-4">Experience:</h5>
                            <div className="row">
                                <div className="col-12 mt-4">
                                    <div className="d-flex">
                                        <div className="text-center">
                                            <img src={company1} className="avatar avatar-small bg-white shadow p-2 rounded" alt="" />
                                            <h6 className="text-muted mt-2 mb-0">2019-22</h6>
                                        </div>

                                        <div className="ms-3">
                                            <h6 className="mb-0">Full Stack Developer</h6>
                                            <p className="text-muted">LinkedIn - U.S.A.</p>
                                            <p className="text-muted mb-0">
                                                It seems that only fragments of the original text remain in the Lorem Ipsum texts used today. One may speculate that over the course of time, certain letters were added or deleted at various positions within the text.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 mt-4">
                                    <div className="d-flex">
                                        <div className="text-center">
                                            <img src={company2} className="avatar avatar-small bg-white shadow p-2 rounded" alt="" />
                                            <h6 className="text-muted mt-2 mb-0">2017-19</h6>
                                        </div>

                                        <div className="ms-3">
                                            <h6 className="mb-0">Back-end Developer</h6>
                                            <p className="text-muted">Lenovo - China</p>
                                            <p className="text-muted mb-0">
                                                It seems that only fragments of the original text remain in the Lorem Ipsum texts used today. One may speculate that over the course of time, certain letters were added or deleted at various positions within the text.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded shadow mt-4">
                                <h5>Get in touch!</h5>
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
                            <div className="card bg-light p-4 rounded shadow">
                                <h5 className="mb-4">Resume:</h5>
                                <a href={pdf} className="btn btn-soft-primary btn-icon btn-pill mb-4" download>
                                    <FiDownload className="icons" /> Download
                                </a>
                                <h5 className="mb-4">Connect With Me:</h5>
                                <div className="social-icons">
                                    <Link to="#" className="btn btn-soft-primary btn-icon rounded-circle">
                                        <FiLinkedin className="icons" />
                                    </Link>
                                    <Link to="#" className="btn btn-soft-primary btn-icon rounded-circle">
                                        <FiFacebook className="icons" />
                                    </Link>
                                    <Link to="#" className="btn btn-soft-primary btn-icon rounded-circle">
                                        <FiTwitter className="icons" />
                                    </Link>
                                    <Link to="#" className="btn btn-soft-primary btn-icon rounded-circle">
                                        <FiInstagram className="icons" />
                                    </Link>
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
