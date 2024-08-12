import React from "react";
import { Link } from "react-router-dom";

// import logo from '../assets/images/logo-light.png'

import {FiShoppingCart, FiDribbble, FiLinkedin, FiFacebook, FiInstagram, FiTwitter,FiBookmark} from '../assets/icons/vander'

export default function Footer({top}){
    return(
        <footer className="bg-footer">
            {top === true ? 
            <div className="py-5">
                <div className="container">
                    <div className="row align-items-end">
                        <div className="col-md-7">
                            <div className="section-title">
                                <div className="d-flex align-items-center">
                                   
                                </div>
                            </div>
                        </div>

                        <div className="col-md-5 mt-4 mt-sm-0">
                            <div className="text-md-end ms-5 ms-sm-0">
                                <Link to="/contactus" className="btn btn-soft-primary my-1">Contact Us</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : ''}
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="py-5 footer-bar">
                            <div className="row align-items-center">
                                <div className="col-sm-3">
                                    <div className="text-center text-sm-start">
                                    </div>
                                </div>
        
                                <div className="col-sm-9 mt-4 mt-sm-0">
                                    <ul className="list-unstyled footer-list terms-service text-center text-sm-end mb-0">
                                        <li className="list-inline-item my-2"><Link to="/index" className="text-foot fs-6 fw-medium me-2"><i className="mdi mdi-circle-small"></i> Home</Link></li>
                                        <li className="list-inline-item my-2"><Link to="/aboutus" className="text-foot fs-6 fw-medium me-2"><i className="mdi mdi-circle-small"></i>About Us</Link></li>
                                        <li className="list-inline-item my-2"><Link to="/job-list-one" className="text-foot fs-6 fw-medium me-2"><i className="mdi mdi-circle-small"></i>Candidates</Link></li>
                                        <li className="list-inline-item my-2"><Link to="/contactus" className="text-foot fs-6 fw-medium me-2"><i className="mdi mdi-circle-small"></i>Contact Us</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           
        </footer>
    )
}