var express = require('express');
var router = express.Router();
var characterController = require('../controllers/CharacterController');

router.get('/:alias', characterController.getOne);
router.get('/', characterController.getAll);

router.post('/' ,characterController.register);
router.put('/:alias', characterController.update);
router.delete('/:alias', characterController.delete);

module.exports = router;