const express = require('express');
const authController = require('../../../controller/admin/authController');
const router = express.Router();

router.post('/signup', authController.registration);

module.exports = router;