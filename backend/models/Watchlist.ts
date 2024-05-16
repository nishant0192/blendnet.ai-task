import pool from '../config/db';

class Watchlist {
  static async createWatchlist(userId: number, symbols: string[]) {
    const query = 'INSERT INTO watchlists (user_id, symbols) VALUES ($1, $2) RETURNING *';
    const values = [userId, symbols];
    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
  
  static async getWatchlistByUserId(userId: number) {
    const query = 'SELECT * FROM watchlists WHERE user_id = $1';
    const values = [userId];
    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

export default Watchlist;
