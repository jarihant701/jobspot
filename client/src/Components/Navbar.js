import React from 'react';
import logoWhite from '../assets/images/logo_white.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to='/'>
        <img src={logoWhite} alt='Logo' />
      </Link>
      <div className='space-between'></div>
      <div className='dropdown'>
        <button className='dropbtn'>
          Login | Register
          <i className='fa fa-caret-down'></i>
        </button>
        <div className='dropdown-content'>
          <Link to='/applicant/'>As Job Seeker</Link>
          <Link to='/recruiter'>As Recruiter</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
