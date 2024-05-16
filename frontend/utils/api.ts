import axios from 'axios';

// Define base URL for your API
const BASE_URL = 'http://localhost:3001/api'; // Update with your backend URL

// Define Axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Define API functions

export const getStockData = async () => {
  try {
    const response = await api.get('/stock');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getWatchlist = async () => {
  try {
    const response = await api.get('/watchlist');
    return response.data;
  } catch (error) {
    throw error;
  }
};
