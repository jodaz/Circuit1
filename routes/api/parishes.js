const router = require('express').Router();
const ParishController = require('../../controllers/ParishController');

router.get('/', ParishController.get);

module.exports = router;
