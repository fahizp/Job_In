import React, { useEffect, useState } from 'react' 
import { Link } from "react-router-dom";
import bg1 from "../assets/images/hero/bg2.jpg"
import logo from "../assets/images/logo-icon-80-white.png"

export default function Comingsoom(){
    let [days, setDays] = useState(0);
    let [hours, setHours] = useState(0);
    let [minutes, setMinutes] = useState(0);
    let [seconds, setSeconds] = useState(0);
  
    let deadline = "December, 31, 2024";
  
    let getTime = () => {
      let time = Date.parse(deadline) - Date.now();
  
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    };
  
    useEffect(() => {
      let interval = setInterval(() => getTime(deadline), 1000);
  
      return () => clearInterval(interval);
    }, []);
    return(
        <section className="bg-home d-flex align-items-center" style={{backgroundImage:`url(${bg1})`, backgroundPosition:'top'}}>
            <div className="bg-overlay bg-gradient-overlay"></div>
            <div className="container">
                <div className="row">
                    <div className="col-12 p-0">
                        <div className="d-flex flex-column min-vh-100 justify-content-center p-md-5">
                            <div className="text-center">
                                <Link to="/"><img src={logo} alt=""/></Link>
                            </div>
                            <div className="title-heading text-center my-auto">
                                <h2 className="title-dark text-white text-uppercase mt-2 mb-4 fw-semibold">We are coming soon...</h2>
                                <p className="text-white para-desc para-dark mx-auto">Find Jobs, Employment & Career Opportunities. Some of the companies we've helped recruit excellent applicants over the years.</p>
                            
                                <div id="countdown">
                                    <ul className="count-down list-unstyled">
                                        <li id="days" className="count-number list-inline-item m-2">{days}<p className='count-head'>Days</p></li>
                                        <li id="hours" className="count-number list-inline-item m-2">{hours}<p className='count-head'>Hours</p></li>
                                        <li id="mins" className="count-number list-inline-item m-2">{minutes}<p className='count-head'>Mins</p></li>
                                        <li id="secs" className="count-number list-inline-item m-2">{seconds}<p className='count-head'>Secs</p></li>
                                        <li id="end" className="h1"></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="mb-0 text-white-50">© {new Date().getFullYear()} job_in. Design with <i className="mdi mdi-heart text-danger"></i> by <Link to="https://shreethemes.in/" target="_blank" className="text-reset">Shreethemes</Link>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}