const router = require('express').Router();
const VoterController = require('../../controllers/VoterController');

router.get('/', VoterController.get);

module.exports = router;