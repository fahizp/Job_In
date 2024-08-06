import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo-icon-64.png"
import error from "../assets/images/error.png"

export default function Error(){
    return(
        <section className="position-relative bg-soft-primary">
            <div className="container">
                <div className="row">
                    <div className="col-12 p-0">
                        <div className="d-flex flex-column min-vh-100 justify-content-center px-md-5 py-5 px-4">
                            <div className="text-center">
                                <Link to="/"><img src={logo} alt=""/></Link>
                            </div>
                            <div className="title-heading text-center my-auto">
                                <img src={error} className="img-fluid" alt=""/>
                                <h3 className="text-dark text-uppercase mt-2 mb-4 fw-bold">Page Not Found?</h3>
                                <p className="text-muted para-desc mx-auto">Whoops, this is embarassing. <br/> Looks like the page you were looking for wasn't found.</p>
                                
                                <div className="mt-4">
                                    <Link to="/" className="btn btn-primary">Back to Home</Link>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="mb-0 text-muted">© {new Date().getFullYear()} job_in. Design with <i className="mdi mdi-heart text-danger"></i> by <Link to="https://shreethemes.in/" target="_blank" className="text-reset">Shreethemes</Link>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}