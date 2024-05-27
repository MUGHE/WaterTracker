const Goal = require('../models/Goal');

exports.getGoalById = (id) => {
  return new Promise((resolve, reject) => {
    Goal.getGoalById(id, (error, results) => {
      if (error) {
        reject(error);
      } else if (results.length === 0) {
        resolve({ status: 404, data: { error: 'Data not found' } });
      } else {
        resolve({ status: 200, data: results });
      }
    });
  });
};

exports.saveOrUpdateGoal = (id, intakeTarget) => {
  return new Promise((resolve, reject) => {
    Goal.getGoalById(id, (selectError, selectResults) => {
      if (selectError) {
        reject(selectError);
      } else if (selectResults.length === 0) {
        Goal.insertGoal(id, (insertError) => {
          if (insertError) {
            reject(insertError);
          } else {
            resolve({ status: 201, data: { id, intakeTarget } });
          }
        });
      } else {
        Goal.updateGoal(id, intakeTarget, (updateError) => {
          if (updateError) {
            reject(updateError);
          } else {
            resolve({ status: 200, data: { id, intakeTarget } });
          }
        });
      }
    });
  });
};
