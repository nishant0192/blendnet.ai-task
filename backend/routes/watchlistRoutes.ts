import express from 'express';
import { createWatchlist, getWatchlist } from '../controllers/watchlistController';
import authMiddleware from '../middleware/authMiddleware';
import { getStockData } from '../services/stockService';

const router = express.Router();

router.post('/:userId', authMiddleware, createWatchlist);
router.get('/:userId', authMiddleware, getWatchlist);

router.get('/stock/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
      const stockData = await getStockData(symbol);
      res.json(stockData);
    } catch (error) {
      console.error('Error fetching stock data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

export default router;
