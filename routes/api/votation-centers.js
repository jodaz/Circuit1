const router = require('express').Router();
const VotationCenterController = require('../../controllers/VotationCenterController');

router.get('/', VotationCenterController.get);
router.post('/', VotationCenterController.store);
router.put('/:id', VotationCenterController.update);

module.exports = router;