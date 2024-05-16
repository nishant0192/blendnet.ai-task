import pool from '../config/db';

class User {
  static async createUser(username: string, password: string) {
    const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
    const values = [username, password];
    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
  
  static async getUserByUsername(username: string) {
    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

export default User;
