const goalService = require('../services/goalService');

exports.getGoal = async (req, res) => {
  const { id } = req.query;
  try {
    const result = await goalService.getGoalById(id);
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.postGoal = async (req, res) => {
  const { id, intakeTarget } = req.body;
  try {
    const result = await goalService.saveOrUpdateGoal(id, intakeTarget);
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
