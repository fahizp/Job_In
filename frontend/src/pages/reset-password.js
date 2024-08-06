import React from "react";
import { Link } from "react-router-dom";

import bg1 from '../assets/images/hero/bg3.jpg'
import logo from '../assets/images/logo-dark.png'

export default function ResetPassword(){
    return(
    <section className="bg-home d-flex align-items-center" style={{backgroundImage:`url(${bg1})`, backgroundPosition:'center'}}>
        <div className="bg-overlay bg-linear-gradient-2"></div>
        <div className="container">
            <div className="row">
                <div className="col-lg-4 col-md-5 col-12">
                    <div className="p-4 bg-white rounded shadow-md mx-auto w-100" style={{maxWidth:'400px'}}>
                        <form>
                            <Link to="/"><img src={logo} className="mb-4 d-block mx-auto" alt=""/></Link>
                            <h6 className="mb-2 text-uppercase fw-semibold">Reset your password</h6>

                            <p className="text-muted">Please enter your email address. You will receive a link to create a new password via email.</p>
                        
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Your Email</label>
                                <input name="email" id="email" type="email" className="form-control" placeholder="example@website.com"/>
                            </div>
            
                            <button className="btn btn-primary w-100" type="submit">Send</button>

                            <div className="col-12 text-center mt-3">
                                <span><span className="text-muted small me-2">Remember your password ? </span> <Link to="/login" className="text-dark fw-semibold small">Sign in</Link></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}