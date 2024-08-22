import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import bg1 from '../assets/images/hero/bg.jpg';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import ScrollTop from '../components/scrollTop';

export default function Candidates() {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCandidateProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8001/candidate/candidatelist', {
          params: {
            page: currentPage,
            limit: itemsPerPage
          }
        });
        setList(response.data.candidateList);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching candidate details:", err);
        setLoading(false);
      }
    };

    fetchCandidateProfile();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <Navbar navClass='defaultscroll sticky' navLight={true} />
      <section
        className='bg-half-170 d-table w-100'
        style={{ backgroundImage: `url(${bg1})`, backgroundPosition: 'top' }}
      >
        <div className='bg-overlay bg-gradient-overlay'></div>
        <div className='container'>
          <div className='row mt-5 justify-content-center'>
            <div className='col-12'>
              <div className='title-heading text-center'>
                <h5 className='heading fw-semibold mb-0 sub-heading text-white title-dark'>
                  Candidates
                </h5>
              </div>
            </div>
          </div>
          <div className='position-middle-bottom'>
            <nav aria-label='breadcrumb' className='d-block'>
              <ul className='breadcrumb breadcrumb-muted mb-0 p-0'>
                <li className='breadcrumb-item'>
                  <Link to='/'>job_in</Link>
                </li>
                <li className='breadcrumb-item active' aria-current='page'>
                  Candidates
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <div className='position-relative'>
        <div className='shape overflow-hidden text-white'>
          <svg
            viewBox='0 0 2880 48'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z'
              fill='currentColor'
            ></path>
          </svg>
        </div>
      </div>
      <section className='section'>
        <div className='container'>
          <div className='row g-4'>
            {loading ? (
              <p>Loading...</p>
            ) : (
              list.map((item, index) => (
                <div className='col-lg-3 col-md-4 col-sm-6 col-12' key={index}>
                  <div className='candidate-card position-relative overflow-hidden text-center shadow rounded p-4'>
                    <div className='content'>
                      <img
                        src={item.profilePhoto}
                        className='avatar avatar-md-md rounded-pill shadow-md'
                        alt={`${item.firstName} ${item.lastName}`}
                      />
                      <div className='mt-3'>
                        <Link
                          to={`/candidate-profile/${item._id}`}
                          className='title h5 text-dark'
                        >
                          {item.firstName} {item.lastName}
                        </Link>
                        <p className='text-muted mt-1'>{item.occupation}</p>
                      </div>
                  
                      {item.skills.map((skill, skillIndex) => (
  <span
    key={skillIndex}
    className='badge bg-soft-primary rounded-pill'
  >
    {skill.title}
  </span>
))}

                      <div className='mt-2 d-flex align-items-center justify-content-between'>
                        <div className='text-center'>
                          <p className='text-muted fw-medium mb-0'>Salary:</p>
                          <p className='mb-0 fw-medium'>{item.salary}</p>
                        </div>
                        <div className='text-center'>
                          <p className='text-muted fw-medium mb-0'>
                            Experience:
                          </p>
                          <p className='mb-0 fw-medium'>{item.totalExperience}</p>
                        </div>
                      </div>
                      <div className='mt-3'>
                        <Link
                          to={`/candidate-profile/${item._id}`}
                          className='btn btn-sm btn-primary me-1'
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className='row'>
            <div className='col-12 mt-4 pt-2'>
              <ul className='pagination justify-content-center mb-0'>
                <li className='page-item'>
                  <Link
                    className='page-link'
                    to='#'
                    aria-label='Previous'
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <span aria-hidden='true'>
                      <i className='mdi mdi-chevron-left fs-6'></i>
                    </span>
                  </Link>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                    <Link className='page-link' to='#' onClick={() => handlePageChange(index + 1)}>
                      {index + 1}
                    </Link>
                  </li>
                ))}
                <li className='page-item'>
                  <Link
                    className='page-link'
                    to='#'
                    aria-label='Next'
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <span aria-hidden='true'>
                      <i className='mdi mdi-chevron-right fs-6'></i>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer top={true} />
      <ScrollTop />
    </>
  );
}
