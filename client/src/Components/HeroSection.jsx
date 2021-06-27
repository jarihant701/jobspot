import React from 'react';
import Search from './Search';

const HeroSection = () => {
  return (
    <div className='hero_section'>
      <div className='hero_div'>
        <h1 className='text-center hero_heading'>
          FIND A <span className='focus'>JOB</span> YOU WILL{' '}
          <span className='focus'>LOVE</span>
        </h1>
        <Search />
      </div>
    </div>
  );
};

export default HeroSection;
