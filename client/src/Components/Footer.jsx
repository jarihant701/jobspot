import React from 'react';
import Logo from '../assets/images/logo.svg';

const Footer = () => {
  return (
    <div className='footer'>
      <div>
        <img src={Logo} alt='' />
      </div>
      <div>Created By Arihant Jain</div>
    </div>
  );
};

export default Footer;
