import React, { useState, useEffect } from 'react'

import bg1 from "../assets/images/hero/bg2.jpg"
import logo from "../assets/images/logo-icon-80-white.png"

export default function Maintenance(){
    let [minutes, setMinutes] = useState(0);
    let [remainingSeconds, setRemainingSeconds] = useState(0);
    useEffect(() => {

        let intervalId = setInterval(() => {
            calculateTimeRemaining()
        }, 1000);

        var seconds = 3599;
        function calculateTimeRemaining() {

            let minutes = Math.round((seconds - 30) / 60);
            let remainingSeconds = seconds % 60;

            setMinutes(minutes);
            setRemainingSeconds(remainingSeconds);

            if (seconds === 0) {
                clearInterval(intervalId);
            } else {
                seconds = seconds - 1;
            }
        }

        return () => {
            clearInterval(intervalId);
        };
    }, []);
    return(
    <section className="bg-home d-flex align-items-center" style={{backgroundImage:`url(${bg1})`, backgroundPosition:'top'}}>
        <div className="bg-overlay bg-gradient-overlay"></div>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12 text-center">
                    <img src={logo} alt=""/>
                    <h2 className="title-dark text-white text-uppercase mt-2 mb-4 fw-semibold">We are back soon...</h2>
                    <p className="text-white-50 para-desc para-dark mx-auto">Find Jobs, Employment & Career Opportunities. Some of the companies we've helped recruit excellent applicants over the years.</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 text-center">
                    <div className="text-center">
                        <span id="maintenance" className="timer">{ minutes }:{ remainingSeconds }</span><span className="d-block h6 text-uppercase text-white title-dark">Minutes</span>
                    </div>
                </div>
            </div>

            <div className="row mt-4 pt-2">
                <div className="col-12 text-center">
                    <div className="subscribe-form">
                        <form className="mx-auto">
                            <input name="email" id="email" type="email" className="rounded-pill bg-white" required="" placeholder="Your email :"/>
                            <button type="submit" className="btn btn-primary rounded-pill">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}
