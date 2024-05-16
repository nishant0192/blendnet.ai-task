import { Request, Response } from 'express';
import Watchlist from '../models/Watchlist';
import { getStockData } from '../services/stockService';
import errorHandler from '../utils/errorHandler';

export const createWatchlist = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { symbols } = req.body;
    const watchlist = await Watchlist.createWatchlist(parseInt(userId), symbols);
    res.status(201).json({ message: 'Watchlist created successfully', watchlist });
  } catch (error: any) {
    errorHandler(res, error);
  }
};

export const getWatchlist = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const watchlist = await Watchlist.getWatchlistByUserId(userId);


    const stockData = await Promise.all(watchlist.symbols.map(async (symbol: string) => {
      try {
        const data = await getStockData(symbol);
        return { symbol, data };
      } catch (error) {

        console.error(`Error fetching stock data for symbol ${symbol}:`, error);
        return { symbol, error: 'Failed to fetch data' };
      }
    }));

    res.status(200).json({ watchlist, stockData });
  } catch (error: any) {
    errorHandler(res, error);
  }
};


