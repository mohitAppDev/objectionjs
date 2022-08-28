const express = require('express');
const authController = require('../../../controller/client/authController');
const router = express.Router();

router.post('/signup', authController.registration);
router.post('/send_code', authController.sendPhoneNoVerification);
router.post('/verify_code', authController.verifyPhoneNoVerifyCode);
router.post('/send_login_code', authController.sendLoginOtp);
router.post('/verify_login_code', authController.verifyLoginOtp);

module.exports = router;