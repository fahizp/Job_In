import React from 'react';
import { Link } from "react-router-dom";

import bg1 from "../assets/images/bg2.png"
import hero1 from '../assets/images/hero1.png'
import company1 from '../assets/images/company/circle-logo.png'
import company2 from '../assets/images/company/facebook-logo.png'
import company3 from '../assets/images/company/google-logo.png'
import company4 from '../assets/images/company/lenovo-logo.png'
import company5 from '../assets/images/company/android.png'
import company6 from '../assets/images/company/linkedin.png'
import company7 from '../assets/images/company/skype.png'
import company8 from '../assets/images/company/snapchat.png'

import Navbar from '../componants/navbar';
import AboutUs from "../componants/aboutUs";
import Categories from "../componants/categories";
import Blog from '../componants/blog';
import Footer from '../componants/footer';
import Companies from '../componants/companies';
import AboutTwo from '../componants/aboutTwo';
import ScrollTop from '../componants/scrollTop';

import { jobData } from "../data/data";

import {FiSearch,FiClock,FiMapPin} from "../assets/icons/vander"

export default function Index(){
    return(
        <>
        <Navbar navClass="defaultscroll sticky"/>
        <section className="bg-half-170 d-table w-100 bg-primary" style={{backgroundImage:`url(${bg1})`, backgroundPosition:'center'}}>
            <div className="container">
                <div className="row g-4 align-items-center">
                    <div className="col-md-6">
                        <div className="title-heading">
                            <h1 className="heading text-white fw-bold">Get hired <br/> by the popular <br/> candidates.</h1>
                            <p className="para-desc text-white-50 mb-0">Find Jobs, Employment & Career Opportunities. Some of the companies we've helped recruit excellent applicants over the years.</p>

                            <div className="text-center subscribe-form mt-4">
                                <form style={{maxWidth:'800px'}}>
                                    <div className="mb-0">
                                        <div className="position-relative">
                                            <FiSearch className="fea icon-20 position-absolute top-50 start-0 translate-middle-y ms-3"/>
                                            <input type="text" id="help" name="name" className="shadow rounded-pill bg-white ps-5" required="" placeholder="Search jobs & candidates ..."/>
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-pills">Search</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="position-relative ms-lg-5">
                            <img src={hero1} className="img-fluid p-5" alt=""/>

                            <div className="spinner">
                                <div className="position-absolute top-0 start-0 mt-lg-5 mt-4 ms-lg-5 ms-4">
                                    <img src={company1} className="avatar avatar-md-sm rounded shadow p-2 bg-white" alt=""/>
                                </div>
                                <div className="position-absolute top-0 start-50 translate-middle-x">
                                    <img src={company2} className="avatar avatar-md-sm rounded shadow p-2 bg-white" alt=""/>
                                </div>
                                <div className="position-absolute top-0 end-0 mt-lg-5 mt-4 me-lg-5 me-4">
                                    <img src={company3} className="avatar avatar-md-sm rounded shadow p-2 bg-white" alt=""/>
                                </div>
                                <div className="position-absolute top-50 start-0 translate-middle-y">
                                    <img src={company4} className="avatar avatar-md-sm rounded shadow p-2 bg-white" alt=""/>
                                </div>
                                <div className="position-absolute top-50 end-0 translate-middle-y">
                                    <img src={company5} className="avatar avatar-md-sm rounded shadow p-2 bg-white" alt=""/>
                                </div>
                                <div className="position-absolute bottom-0 start-0 mb-lg-5 mb-4 ms-lg-5 ms-4">
                                    <img src={company6} className="avatar avatar-md-sm rounded shadow p-2 bg-white" alt=""/>
                                </div>
                                <div className="position-absolute bottom-0 start-50 translate-middle-x">
                                    <img src={company7} className="avatar avatar-md-sm rounded shadow p-2 bg-white" alt=""/>
                                </div>
                                <div className="position-absolute bottom-0 end-0 mb-lg-5 mb-4 me-lg-5 me-4">
                                    <img src={company8} className="avatar avatar-md-sm rounded shadow p-2 bg-white" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      
        </>
    )
}