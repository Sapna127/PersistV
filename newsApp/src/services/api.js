import axios from 'axios';

const API_URL = 'https://newsapi.org/v2/top-headlines';
const API_KEY = 'dd4d4e6f0f6244cea094b95aa7e593cb';

export const fetchArticles = async (category = 'business', country = 'us', language = 'en') => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        category: category,
        country: country,
        language: language,
        apiKey: API_KEY
      }
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};
