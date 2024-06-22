import React, { useState } from 'react';
import styles from './Search.module.css';

const categories = ['business','entertainment','general','health','science','sports','technology'];

const Search = ({ selectedCategory, onCategoryChange, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
    <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search articles..."
        className={styles.searchBox}
      />
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className={styles.dropdown}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      
    </div>
  );
};

export default Search;
