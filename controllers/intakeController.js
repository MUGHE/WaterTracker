const intakeService = require('../services/intakeService');

exports.getIntake = async (req, res) => {
  const { id, date } = req.query;
  try {
    const result = await intakeService.getIntakeByIdAndDate(id, date);
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.postIntake = async (req, res) => {
  const { id, waterIntakeAmount, date } = req.body;
  try {
    const result = await intakeService.saveOrUpdateIntake(id, waterIntakeAmount, date);
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getHistory = async (req, res) => {
  console.log(req)
  const { id } = req.query;
  try {
    const result = await intakeService.getIntakeHistory(id);
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
