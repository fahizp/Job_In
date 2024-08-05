import React, { useState } from 'react';
import { Link } from "react-router-dom";

import bg1 from "../assets/images/hero/bg.jpg"

import Navbar from "../componants/navbar";
import Footer from '../componants/footer';
import ScrollTop from '../componants/scrollTop';

import { helpcenterData, accordionData } from "../data/data";

export default function HelpcenterOverview(){
    let [activeIndex,setActiveIndex] = useState(0)
    return(
        <>
        <Navbar navClass="defaultscroll sticky" navLight={true}/>
        <section className="bg-half-170 d-table w-100" style={{backgroundImage:`url(${bg1})`, backgroundPosition:'top'}}>
            <div className="bg-overlay bg-gradient-overlay"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-12">
                        <div className="title-heading text-center">
                            <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">Hello! <br/> How can we help you?</h5>
                        </div>

                        <div className="subscribe-form mt-4">
                            <form className="mx-auto">
                                <input type="text" id="help" name="name" className="rounded-pill bg-white-50" required="" placeholder="Search your questions or topic..."/>
                                <button type="submit" className="btn btn-primary rounded-pill">Search</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="position-middle-bottom">
                    <nav aria-label="breadcrumb" className="d-block">
                        <ul className="breadcrumb breadcrumb-muted mb-0 p-0">
                            <li className="breadcrumb-item"><Link to="/">job_in</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Helpcenter</li>
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
                    <div className="col-12">
                        <div className="section-title text-center mb-4 pb-2">
                            <h4 className="mb-4 title">Find the help you need</h4>
                            <p className="para-desc mx-auto text-muted">We are a huge marketplace dedicated to connecting great artists of all job_in with their fans and unique token collectors!</p>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    {helpcenterData.map((item,index)=>{
                        let Icon = item.icon
                        return(
                        <div className="col-md-4 mt-4 pt-2" key={index}>
                            <div className="position-relative features text-center mx-lg-4 px-md-1">
                                <div className="feature-icon bg-soft-primary rounded shadow mx-auto position-relative overflow-hidden d-flex justify-content-center align-items-center">
                                    <Icon className="fea icon-ex-md"/>
                                </div>
        
                                <div className="mt-4">
                                    <Link to="/helpcenter-faqs" className="title h5 text-dark">{item.title}</Link>
                                    <p className="text-muted mt-3 mb-0">{item.desc}</p>
                                    <div className="mt-3">
                                        <Link to="/helpcenter-faqs" className="btn btn-link primary text-primary">Read More <i className="mdi mdi-arrow-right"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>

            <div className="container mt-100 mt-60">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="section-title text-center mb-4 pb-2">
                            <h4 className="mb-4">Get Started</h4>
                            <p className="para-desc mx-auto text-muted">We are a huge marketplace dedicated to connecting great artists of all job_in with their fans and unique token collectors!</p>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-9 mt-4 pt-2">
                        <div className="accordion" id="buyingquestion">
                            {accordionData.map((item,index)=>{
                                return(
                                <div className="accordion-item rounded mt-2" key={index}>
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className={`${activeIndex === index ? '' : 'collapsed'} accordion-button border-0 bg-light`} onClick={() => setActiveIndex(index) }>
                                            {item.title}
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className={`${activeIndex === index ? 'show' : ''} accordion-collapse border-0 collapse`}>
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
        </section>
        <Footer/>
        <ScrollTop/>
        </>
    )
}