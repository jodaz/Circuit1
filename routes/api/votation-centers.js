const router = require('express').Router();
const VotationCenterController = require('../../controllers/VotationCenterController');

router.get('/:id', VotationCenterController.show);
router.get('/', VotationCenterController.get);
router.put('/:id', VotationCenterController.update);
router.post('/', VotationCenterController.store);
router.post('/vote/:id', VotationCenterController.vote);
router.delete('/:id', VotationCenterController.destroy);

module.exports = router;
