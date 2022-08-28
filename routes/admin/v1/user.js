const express = require('express');
const userController = require('../../../controller/admin/userController');
const router = express.Router();

router.get('/getUser/:id', userController.getUser);
router.get('/getUsers', userController.getAllUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;