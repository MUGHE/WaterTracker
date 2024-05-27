const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12709265',
  password: 'sFbGj53Vng',
  database: 'sql12709265'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

module.exports = db;
