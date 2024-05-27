const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');

router.get('/goal', goalController.getGoal);
router.post('/goal', goalController.postGoal);

module.exports = router;
