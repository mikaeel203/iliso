// Import mysql2 with Promise support for async/await database operations
import mysql2 from 'mysql2/promise';

// Load environment variables from .env file into process.env
import { config } from 'dotenv';
config(); // Must be called before using process.env variables

// Create a MySQL connection pool using environment variables
const pool = mysql2.createPool({
  host: process.env.HOST,         // Database host (e.g., localhost or remote IP)
  user: process.env.USER,         // Database username
  password: process.env.PASSWORD, // Database password
  database: process.env.DATABASE, // Name of the database to use
});

// Base API URL used in links (e.g., for password reset links)
export const API_URL = "http://localhost:3000"; // Update this in production to your deployed backend URL

// Export the pool for use in DB queries across the project
export { pool };
