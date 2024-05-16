import axios from 'axios';

const ALPHA_VANTAGE_API_KEY = process.env.AV_API_KEY;

export const getStockData = async (symbol: string) => {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${ALPHA_VANTAGE_API_KEY}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
