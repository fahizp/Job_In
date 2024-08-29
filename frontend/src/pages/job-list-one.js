import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from '../context/UserContext';

import bg1 from "../assets/images/hero/bg.jpg";
import Navbar from "../components/navbar";
import AboutTwo from "../components/aboutTwo";
import FormSelect from "../components/formSelect";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";
import { FiClock, FiMapPin } from "../assets/icons/vander";

const daysAgo = (dateString) => {
  const postedDate = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - postedDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default function JobListOne() {
  const { userId } = useContext(UserContext);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchJobList = async (page) => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8001/job/joblist`, {
          params: { page,userId }
        });
        setList(response.data.alljobs);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching job list:", err);
        setLoading(false);
      }
    };

    fetchJobList(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar navClass="defaultscroll sticky" navLight={true} />

      <section
        className="bg-half-170 d-table w-100"
        style={{ backgroundImage: `url(${bg1})`, backgroundPosition: "top" }}
      >
        <div className="bg-overlay bg-gradient-overlay"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">
                  Job Vacancies
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="position-relative">
        <div className="shape overflow-hidden text-white">
          <svg
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 mt-4">
              <div className="features-absolute">
                <div className="d-md-flex justify-content-between align-items-center bg-white shadow rounded p-4">
                  <FormSelect setFilteredJobs={(filtered) => setList(filtered)} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-60">
          <div className="row g-4">
            {loading ? (
              <p>Loading...</p>
            ) : (
              list.map((item, index) => (
                <div className="col-12" key={index}>
                  <div className="job-post job-post-list rounded shadow p-4 d-md-flex align-items-center justify-content-between position-relative">
                    <div className="d-flex align-items-center w-310px">
                      <img
                        src={item.logo}
                        className="avatar avatar-small rounded shadow p-3 bg-white"
                        alt=""
                      />
                      <div className="ms-3">
                        <Link
                          to={`/job-detail-one/${item._id}`}
                          className="h5 title text-dark"
                        >
                          {item.title}
                        </Link>
                      </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between d-md-block mt-3 mt-md-0 w-100px">
                      <span className="badge bg-soft-primary rounded-pill">
                        {item.jobCategory}
                      </span>
                      <span className="text-muted d-flex align-items-center fw-medium mt-md-2">
                        <FiClock className="fea icon-sm me-1 align-middle" />
                        {daysAgo(item.postedDate)} days ago
                      </span>
                    </div>

                    <div className="d-flex align-items-center justify-content-between d-md-block mt-2 mt-md-0 w-130px">
                      <span className="text-muted d-flex align-items-center">
                        <FiMapPin className="fea icon-sm me-1 align-middle" />
                        {item.country}
                      </span>
                      <span className="d-flex fw-medium mt-md-2">
                        ${item.minSalary} - ${item.maxSalary}
                      </span>
                    </div>

                    <div className="mt-3 mt-md-0">
                      <Link
                        to={`/job-detail-one/${item._id}`}
                        className="btn btn-sm btn-primary w-full ms-md-1"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="row">
            <div className="col-12 mt-4 pt-2">
              <ul className="pagination justify-content-center mb-0">
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <span aria-hidden="true">
                      <i className="mdi mdi-chevron-left fs-6"></i>
                    </span>
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li
                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                    key={index}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <span aria-hidden="true">
                      <i className="mdi mdi-chevron-right fs-6"></i>
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <AboutTwo />
      </section>

      <Footer />
      <ScrollTop />
    </>
  );
}
