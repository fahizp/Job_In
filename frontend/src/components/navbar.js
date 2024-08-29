import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoDark from '../assets/images/logo-dark.png';
import client from '../assets/images/team/01.jpg';
import { FiUser, FiLogOut } from '../assets/icons/vander';

export default function Navbar({ navClass, navLight }) {
  const [isOpen, setIsopen] = useState(true);
  const [scroll, setScroll] = useState(false);
  const [cartItem, setCartItem] = useState(false);
  const [menu, setMenu] = useState('');
  const location = useLocation();

  useEffect(() => {
    const current = location.pathname.substring(
      location.pathname.lastIndexOf('/') + 1,
    );
    setMenu(current);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenu(!isOpen);
  };

  const handleDropdown = (event) => {
    event.stopPropagation();
    setCartItem(!cartItem);
  };

  return (
    <header id='topnav' className={`${scroll ? 'nav-sticky' : ''} ${navClass}`}>
      <div className='container'>
        {navLight ? (
          <Link className='logo' to='/'>
            <span className='logo-light-mode'>
              {/* <img src={logoDark} className="l-dark" alt="logo" /> */}
            </span>
          </Link>
        ) : (
          <Link className='logo' to='/'>
            <span className='logo-light-mode'>
              {/* <img src={logoDark} className="l-dark" alt="logo" /> */}
            </span>
          </Link>
        )}
        <div className='menu-extras'>
          <div className='menu-item'>
            <Link
              to='#'
              className='navbar-toggle'
              id='isToggle'
              onClick={toggleMenu}
            >
              <div className='lines'>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </Link>
          </div>
        </div>

        <ul className='buy-button list-inline mb-0'>
          <li className='list-inline-item ps-1 mb-0'>
            <div className='dropdown dropdown-primary'>
              <button
                type='button'
                onClick={handleDropdown}
                className='dropdown-toggle btn btn-sm btn-icon btn-pills btn-primary'
              >
                <img
                  src={client}
                  className='img-fluid rounded-pill'
                  alt='client'
                />
              </button>
              <div
                style={{ display: cartItem ? 'block' : 'none' }}
                className='dropdown-menu dd-menu dropdown-menu-end bg-white rounded shadow border-0 mt-3'
              >
                <Link
                  to='/profile'
                  className='dropdown-item fw-medium fs-6'
                >
                  <FiUser className='fea icon-sm me-2 align-middle' />
                  Profile
                </Link>
                <Link to='/candidate-profile-setting' className='dropdown-item fw-medium fs-6'>
                  Candidate Post
                </Link>
                <Link to='/job-post' className='dropdown-item fw-medium fs-6'>
                  Job post
                </Link>
                <Link to='/Logout' className='dropdown-item fw-medium fs-6'>
                  Logout
                </Link>
              </div>
            </div>
          </li>
        </ul>

        <div id='navigation'>
          <ul className='navigation-menu nav-right nav-light'>
            <li>
              <Link to='/index'>Home</Link>
              <span className='menu-arrow'></span>
            </li>
            <li className={menu === 'aboutus' ? 'active' : ''}>
              <Link to='/aboutus' className='sub-menu-item'>
                About Us
              </Link>
            </li>
            <li className={menu === 'job-list-one' ? 'active' : ''}>
              <Link to='/job-list-one' className='sub-menu-item'>
                Jobs
              </Link>
            </li>
            <li className={menu === 'candidates' ? 'active' : ''}>
              <Link to='/candidates' className='sub-menu-item'>
                Candidates
              </Link>
            </li>
            <li className={menu === 'contactus' ? 'active' : ''}>
              <Link to='/contactus' className='sub-menu-item'>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
