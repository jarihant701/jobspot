import React from 'react';

const Paginate = ({ jobsPerPage, totaljobs, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totaljobs / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='paginate'>
      <ul className='pagination'>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={
              currentPage === number ? 'page-item active' : 'page-item'
            }
          >
            <button onClick={() => paginate(number)} className='page-link'>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginate;
