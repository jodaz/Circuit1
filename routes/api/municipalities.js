const router = require('express').Router();
const MunicipalityController = require('../../controllers/MunicipalityController');

router.get('/', MunicipalityController.get);

module.exports = router;
