const router = require('express').Router();
const UserController = require('../../controllers/UserController');

router.get('/', UserController.get);
router.post('/', UserController.store);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.destroy);

module.exports = router;
