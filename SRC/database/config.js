const mysql = require('mysql2/promise');
import dotenv from 'dotenv';
dotenv.config();
const pool = mysql.createPool({
  host: process.env.DB_Host,
  user: process.env.DB_User,
  database: process.env.DB_Database,
  waitForConnections: true,
  connectionLimit: 10,
});
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
  }

  if (connection) connection.release();

  return;
});
export default pool;
