const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'aman',
  database: 'portfolio_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();

promisePool.getConnection()
  .then(conn => {
    console.log('✅ Connected to MySQL database (portfolio_db)');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Failed to connect to MySQL database:', err.message);
  });

module.exports = promisePool;
