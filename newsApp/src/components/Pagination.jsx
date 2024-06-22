import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ totalPages, currentPage, paginate }) => {
  return (
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => paginate(index + 1)}
          className={`${styles.pageNumber} ${currentPage === index + 1 ? styles.active : ''}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
