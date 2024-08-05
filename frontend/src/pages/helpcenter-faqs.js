import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Link as Link2 } from 'react-scroll';

import bg1 from "../assets/images/hero/bg.jpg"

import Navbar from "../componants/navbar";
import Footer from "../componants/footer";
import ScrollTop from "../componants/scrollTop";

import {accordionData} from "../data/data"

export default function HelpcenterFaq(){
    let[activeIndex1,setActiveIndex1] = useState(0)
    let[activeIndex2,setActiveIndex2] = useState(0)
    let[activeIndex3,setActiveIndex3] = useState(0)
    let[activeIndex4,setActiveIndex4] = useState(0
        )
    return(
        <>
        <Navbar navClass="defaultscroll sticky" navLight={true}/>
        <section className="bg-half-170 d-table w-100" style={{backgroundImage:`url(${bg1})`, backgroundPosition:'top'}}>
            <div className="bg-overlay bg-gradient-overlay"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-12">
                        <div className="title-heading text-center">
                            <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">Frequently Asked Questions</h5>
                        </div>
                    </div>
                </div>

                <div className="position-middle-bottom">
                    <nav aria-label="breadcrumb" className="d-block">
                        <ul className="breadcrumb breadcrumb-muted mb-0 p-0">
                            <li className="breadcrumb-item"><Link to="/">job_in</Link></li>
                            <li className="breadcrumb-item"><Link to="/helpcenter-overview">Help Center</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">FAQs</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>
        <div className="position-relative">
            <div className="shape overflow-hidden text-white">
                <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                </svg>
            </div>
        </div>

        <section className="section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-5 col-12 d-none d-md-block">
                        <div className="rounded shadow p-4 sticky-bar">
                            <ul className="list-unstyled sidebar-nav mb-0 py-0" id="navmenu-nav">
                                <li className="navbar-item p-0"><Link2 to="tech"  spy={true} activeClass="active" smooth={true} className="text-base font-medium navbar-link">Buying Questions</Link2></li>
                                <li className="navbar-item mt-3 p-0"><Link2 to="general"  spy={true} activeClass="active" smooth={true} className="text-base font-medium navbar-link">General Questions</Link2></li>
                                <li className="navbar-item mt-3 p-0"><Link2 to="payment"  spy={true} activeClass="active" smooth={true} className="text-base font-medium navbar-link">Payments Questions</Link2></li>
                                <li className="navbar-item mt-3 p-0"><Link2 to="support"  spy={true} activeClass="active" smooth={true} className="text-base font-medium navbar-link">Support Questions</Link2></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-8 col-md-7 col-12">
                        <div className="section-title" id="tech">
                            <h4>Buying Product</h4>
                            <div className="accordion mt-4 pt-2">
                                {accordionData.map((item,index)=>{
                                    return(
                                    <div className="accordion-item rounded mt-2" key={index}>
                                        <h2 className="accordion-header" id="headingOne">
                                            <button className={`${activeIndex1 === index ? '' : 'collapsed'} accordion-button border-0 bg-light`} onClick={() => setActiveIndex1(index) }>
                                                {item.title}
                                            </button>
                                        </h2>
                                        <div id="collapseOne" className={`${activeIndex1 === index ? 'show' : ''} accordion-collapse border-0 collapse`}>
                                            <div className="accordion-body text-muted">
                                                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.
                                            </div>
                                        </div>
                                    </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="section-title mt-5" id="general">
                            <h4>General Questions</h4>
                            <div className="accordion mt-4 pt-2">
                                {accordionData.map((item,index)=>{
                                    return(
                                    <div className="accordion-item rounded mt-2" key={index}>
                                        <h2 className="accordion-header" id="headingOne">
                                            <button className={`${activeIndex2 === index ? '' : 'collapsed'} accordion-button border-0 bg-light`} onClick={() => setActiveIndex2(index) }>
                                                {item.title}
                                            </button>
                                        </h2>
                                        <div id="collapseOne" className={`${activeIndex2 === index ? 'show' : ''} accordion-collapse border-0 collapse`}>
                                            <div className="accordion-body text-muted">
                                                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.
                                            </div>
                                        </div>
                                    </div>
                                    )
                                })}
                            </div>
                        </div>


                        <div className="section-title mt-5" id="payment">
                            <h4>Payments Questions</h4>
                            <div className="accordion mt-4 pt-2">
                                {accordionData.map((item,index)=>{
                                    return(
                                    <div className="accordion-item rounded mt-2" key={index}>
                                        <h2 className="accordion-header" id="headingOne">
                                            <button className={`${activeIndex3 === index ? '' : 'collapsed'} accordion-button border-0 bg-light`} onClick={() => setActiveIndex3(index) }>
                                                {item.title}
                                            </button>
                                        </h2>
                                        <div id="collapseOne" className={`${activeIndex3 === index ? 'show' : ''} accordion-collapse border-0 collapse`}>
                                            <div className="accordion-body text-muted">
                                                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.
                                            </div>
                                        </div>
                                    </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="section-title mt-5" id="support">
                            <h4>Support Questions</h4>
                            <div className="accordion mt-4 pt-2">
                                {accordionData.map((item,index)=>{
                                    return(
                                    <div className="accordion-item rounded mt-2" key={index}>
                                        <h2 className="accordion-header" id="headingOne">
                                            <button className={`${activeIndex4 === index ? '' : 'collapsed'} accordion-button border-0 bg-light`} onClick={() => setActiveIndex4(index) }>
                                                {item.title}
                                            </button>
                                        </h2>
                                        <div id="collapseOne" className={`${activeIndex4 === index ? 'show' : ''} accordion-collapse border-0 collapse`}>
                                            <div className="accordion-body text-muted">
                                                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.
                                            </div>
                                        </div>
                                    </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
        <ScrollTop/>
        </>
    )
}