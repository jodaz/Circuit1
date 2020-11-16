const router = require('express').Router();
const VoterController = require('../../controllers/AnalyticsController');

router.get('/basic', VoterController.basic);

module.exports = router;
