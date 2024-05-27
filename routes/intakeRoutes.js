const express = require('express');
const router = express.Router();
const intakeController = require('../controllers/intakeController');

router.get('/intake', intakeController.getIntake);
router.post('/intake', intakeController.postIntake);
router.get('/history', intakeController.getHistory);

module.exports = router;
