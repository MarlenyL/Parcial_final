var express = require('express');
var router = express.Router();
var characterController = require('../controllers/CharacterController');

router.get('/:username', characterController.getOne);
router.get('/', characterController.getAll);

router.post('/' ,characterController.register);
router.put('/:username', characterController.update);
router.delete('/:username', characterController.delete);

module.exports = router;