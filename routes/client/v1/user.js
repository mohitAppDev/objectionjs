const express = require('express');
const userController = require('../../../controller/client/userController');
const router = express.Router();

router.get('/getUser', userController.getUser);
router.post('/update', userController.updateUser);
router.delete('/delete', userController.deleteUser);

module.exports = router;