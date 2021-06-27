import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div className='page404'>
      <h1 className='text-center text-primary'>404</h1>
      <h3 className='text-center fs-3'>Looks like you are lost</h3>
      <p>
        <Link to='/' className='text-center fs-5'>
          Let's take you back to home
        </Link>
      </p>
    </div>
  );
};

export default Page404;
