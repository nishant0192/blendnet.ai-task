import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import watchlistRoutes from './routes/watchlistRoutes';
import errorHandler from './utils/errorHandler';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the cors package

dotenv.config();

const app = express();

app.use(bodyParser.json());

// Allow CORS for all routes
app.use(cors());

app.use('/auth', authRoutes);
app.use('/watchlist', watchlistRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(res, err);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
