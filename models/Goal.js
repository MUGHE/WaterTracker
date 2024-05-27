const db = require('../config/db.config');

exports.getGoalById = (id, callback) => {
  const sql = 'SELECT * FROM DAILY_GOAL WHERE id = ?';
  db.query(sql, [id], callback);
};

exports.insertGoal = (id, callback) => {
  const sql = 'INSERT INTO DAILY_GOAL (id) VALUES (?)';
  db.query(sql, [id], callback);
};

exports.updateGoal = (id, intakeTarget, callback) => {
  const sql = 'UPDATE DAILY_GOAL SET Daily_Intake_Goal = ? WHERE id = ?';
  db.query(sql, [intakeTarget, id], callback);
};
