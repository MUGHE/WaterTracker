const db = require('../config/db.config');

exports.getIntakeByIdAndDate = (id, date, callback) => {
  const sql = 'SELECT * FROM WATER_INTAKE WHERE id = ? AND Date = ?';
  db.query(sql, [id, date], callback);
};

exports.insertIntake = (id, waterIntakeAmount, date, callback) => {
  const sql = 'INSERT INTO WATER_INTAKE (id, water_intake_ammount, Date) VALUES (?, ?, ?)';
  db.query(sql, [id, waterIntakeAmount, date], callback);
};

exports.updateIntake = (id, newAmount, date, callback) => {
  const sql = 'UPDATE WATER_INTAKE SET water_intake_ammount = ? WHERE id = ? AND Date = ?';
  db.query(sql, [newAmount, id, date], callback);
};

exports.getIntakeHistory = (id, callback) => {
  console.log("setting query")
  const sql = 'SELECT * FROM WATER_INTAKE WHERE id = ?';
  db.query(sql, [id], callback);
};
