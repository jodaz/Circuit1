const router = require('express').Router();
const LogoutController = require('../../controllers/LogoutController');

router.get('/logout', LogoutController.logout);

module.exports = router;
