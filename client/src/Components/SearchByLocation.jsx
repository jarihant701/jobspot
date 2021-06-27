import React from 'react';
import { Link } from 'react-router-dom';
import Delhi from '../assets/images/delhi_ncr.svg';
import Banglore from '../assets/images/bangalore.svg';
import Chennai from '../assets/images/chennai.svg';
import Hyderabad from '../assets/images/hyderabad.svg';
import Kolkata from '../assets/images/kolkata.svg';
import Mumbai from '../assets/images/mumbai.svg';

const SearchByLocation = () => {
  return (
    <div className='home_div'>
      <h2 className='home_heading'>Search By Location</h2>
      <div className='location-div'>
        <Link to='/search/jobs?location=delhi' className='location'>
          <img src={Delhi} alt='Delhi' />
          Delhi
        </Link>
        <Link to='/search/jobs?location=bangalore' className='location'>
          <img src={Banglore} alt='Banglore' />
          Banglore
        </Link>
        <Link to='/search/jobs?location=chennai' className='location'>
          <img src={Chennai} alt='Chennai' />
          Chennai
        </Link>
        <Link to='/search/jobs?location=hyderabad' className='location'>
          <img src={Hyderabad} alt='Hyderabad' />
          Hyderabad
        </Link>
        <Link to='/search/jobs?location=kolkata' className='location'>
          <img src={Kolkata} alt='Kolkata' />
          Kolkata
        </Link>
        <Link to='/search/jobs?location=mumbai' className='location'>
          <img src={Mumbai} alt='Mumbai' />
          Mumbai
        </Link>
      </div>
    </div>
  );
};

export default SearchByLocation;
