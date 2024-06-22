import React, { useEffect, useState } from 'react';
import { fetchArticles } from '../services/api';
import Pagination from '../components/Pagination';
import Search from '../components/Search';
import styles from './Home.module.css';

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchArticles(selectedCategory === 'All' ? '' : selectedCategory, 'us', 'en', searchTerm);
        setArticles(data);
        setFilteredArticles(data);
        setTotalPages(Math.ceil(data.length / articlesPerPage));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, [selectedCategory, searchTerm, articlesPerPage]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <h1>News Articles</h1>
      <Search
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onSearch={setSearchTerm}
      />
      <div className={styles.articles}>
        {currentArticles.map((article) => (
          <div key={article.url} className={styles.articleCard}>
            <img src={article.urlToImage} alt={article.title} className={styles.articleImage} />
            <h3 className={styles.articleTitle}>{article.title}</h3>
            <p className={styles.articleDescription}>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.readMore}>Read More</a>
          </div>
        ))}
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} paginate={paginate} />
    </div>
  );
};

export default HomePage;
