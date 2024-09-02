import React from 'react';
import { Link } from 'react-router-dom';

import bg1 from '../assets/images/hero/bg.jpg';

import Navbar from '../components/navbar';
import Footer from '../components/footer';

import { blogData } from '../data/data';

import { FiClock, FiCalendar } from '../assets/icons/vander';
import ScrollTop from '../components/scrollTop';

export default function Blogs() {
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
                <p className='text-white-50 para-desc mx-auto mb-0'>
                  Latest News
                </p>
                <h5 className='heading fw-semibold mb-0 sub-heading text-white title-dark'>
                  Blogs & News
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
                  Blogs
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
            {blogData.map((item, index) => {
              return (
                <div className='col-lg-4 col-md-6' key={index}>
                  <div className='card blog blog-primary shadow rounded overflow-hidden border-0'>
                    <div className='card-img blog-image position-relative overflow-hidden rounded-0'>
                      <div className='position-relative overflow-hidden'>
                        <img src={item.image} className='img-fluid' alt='' />
                        <div className='card-overlay'></div>
                      </div>
                    </div>

                    <div className='card-body blog-content position-relative p-0'>
                      <div className='blog-tag px-4'>
                        <Link to='' className='badge bg-primary rounded-pill'>
                          {item.tag}
                        </Link>
                      </div>
                      <div className='p-4'>
                        <ul className='list-unstyled text-muted small mb-2'>
                          <li className='d-inline-flex align-items-center me-2'>
                            <FiCalendar className='fea icon-ex-sm me-1 text-dark' />
                            {item.date}
                          </li>
                          <li className='d-inline-flex align-items-center'>
                            <FiClock className='fea icon-ex-sm me-1 text-dark' />
                            {item.time}
                          </li>
                        </ul>

                        <Link
                          to={`/blog-detail/${item.id}`}
                          className='title fw-semibold fs-5 text-dark'
                        >
                          {item.title}
                        </Link>

                        <ul className='list-unstyled d-flex justify-content-between align-items-center text-muted mb-0 mt-3'>
                          <li className='list-inline-item me-2'>
                            <Link
                              to=''
                              className='btn btn-link primary text-dark'
                            >
                              Read Now <i className='mdi mdi-arrow-right'></i>
                            </Link>
                          </li>
                          <li className='list-inline-item'>
                            <span className='text-dark'>By</span>{' '}
                            <Link to='' className='text-muted link-title'>
                              {item.company}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className='row'>
            <div className='col-12 mt-4 pt-2'>
              <ul className='pagination justify-content-center mb-0'>
                <li className='page-item'>
                  <Link className='page-link' to='#' aria-label='Previous'>
                    <span aria-hidden='true'>
                      <i className='mdi mdi-chevron-left fs-6'></i>
                    </span>
                  </Link>
                </li>
                <li className='page-item'>
                  <Link className='page-link' to='#'>
                    1
                  </Link>
                </li>
                <li className='page-item active'>
                  <Link className='page-link' to='#'>
                    2
                  </Link>
                </li>
                <li className='page-item'>
                  <Link className='page-link' to='#'>
                    3
                  </Link>
                </li>
                <li className='page-item'>
                  <Link className='page-link' to='#' aria-label='Next'>
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
      <Footer />
      <ScrollTop />
    </>
  );
}
