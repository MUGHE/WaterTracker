const WaterIntake = require('../models/WaterIntake');

exports.getIntakeByIdAndDate = (id, date) => {
  return new Promise((resolve, reject) => {
    WaterIntake.getIntakeByIdAndDate(id, date, (error, results) => {
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

exports.saveOrUpdateIntake = (id, waterIntakeAmount, date) => {
  return new Promise((resolve, reject) => {
    WaterIntake.getIntakeByIdAndDate(id, date, (selectError, selectResults) => {
      if (selectError) {
        reject(selectError);
      } else if (selectResults.length === 0) {
        WaterIntake.insertIntake(id, waterIntakeAmount, date, (insertError) => {
          if (insertError) {
            reject(insertError);
          } else {
            resolve({ status: 201, data: { id, waterIntakeAmount, date } });
          }
        });
      } else {
        const currentAmount = selectResults[0].water_intake_ammount;
        const newAmount = currentAmount + waterIntakeAmount;
        WaterIntake.updateIntake(id, newAmount, date, (updateError) => {
          if (updateError) {
            reject(updateError);
          } else {
            resolve({ status: 200, data: { id, waterIntakeAmount: newAmount, date } });
          }
        });
      }
    });
  });
};

exports.getIntakeHistory = (id) => {
  return new Promise((resolve, reject) => {
    WaterIntake.getIntakeHistory(id, (error, results) => {
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
