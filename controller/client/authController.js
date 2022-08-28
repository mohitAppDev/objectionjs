const { userType } = require('../../constant/authConstant');
const userService = require('../../service/auth');
const emailService = require('../../service/email');
const _ = require("lodash");
const generalConfig = require('../../config/generalConfig')

class AuthController {

  async registration(req, res, next) {
    try {
      let params = req.body;
      if (!params.email && !params.phoneNumber && !params.firstName && !params.lastName) {
        return res.json({ "error": true, "message": "'Insufficient request parameters! email and phone no is required.'" })
      }
      const userDetail = await userService.getUser({ "email": params.email, "phoneNumber": params.phoneNumber });
      if (userDetail) res.json({ "error": true, "message": "User already exist!" });
      params.userType = userType.client;
      const user = await userService.addUser(params);
      if (!user) res.json({ "error": true, "message": "Issue in user register!", "data": user });
      await userService.sendSMS(params.phoneNumber, "Welcome to Wafer!");
      await emailService.welcomeEmail(params.email, "Welcome Mail");
      res.json({ "error": false, "message": "User register successfully!", "data": user });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      let params = req.body;
      if (!params.id) {
        return res.json({ "error": true, "message": "'Insufficient request parameters! id is required.'" })
      }
      const user = await userService.updateUserById(params);
      if (!user) res.json({ "error": true, "message": "Issue in user updation!", "data": user });
      res.json({ "error": false, "message": "User updation successfully!", "data": user });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  async sendPhoneNoVerification(req, res, next) {
    try {
      let params = req.body;
      if (!params.phoneNumber) {
        res.json({ "error": true, "message": "'Insufficient request parameters! phone no is required.'" })
      }
      const user = await userService.getUser({ "phoneNumber": params.phoneNumber });
      if (!user) res.json({ "error": true, "message": "User phone Number not exist", "data": user });
      await userService.sendMobileNoVerificationCode(params.phoneNumber, "phone_no_verify");
      res.json({ "error": false, "message": `Verification code send successfully!. Please check your mobile No: ${params.phoneNumber}`, "data": null });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  async verifyPhoneNoVerifyCode(req, res, next) {
    try {
      let params = req.body;
      if (!params.phoneNumber && !params.code) {
        res.json({ "error": true, "message": "'Insufficient request parameters! phone no and code is required.'" })
      }
      let user = await userService.getUser({ "phoneNumber": params.phoneNumber });
      if (!user) res.json({ "error": true, "message": "User phone Number not exist" });
      let result = await userService.verifyMobileNoVerificationCode(params.phoneNumber, params.code, "phone_no_verify");
      if (result.flag) {
        res.json({ "error": true, "message": result.message });
      }
      await userService.updateUser(params.phoneNumber, "phone");
      res.json({ "error": false, "message": result.message });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  async sendLoginOtp(req, res, next) {
    try {
      let params = req.body;
      if (!params.phoneNumber) {
        res.json({ "error": true, "message": "'Insufficient request parameters! phone no is required.'" })
      }
      const user = await userService.getUser({ "phoneNumber": params.phoneNumber });
      if (!user) res.json({ "error": true, "message": "User phone Number not exist", "data": null });
      let { isPhoneNoVerify } = user;
      if(!isPhoneNoVerify) res.json({ "error": true, "message": "Your mobile no is not verified!", "data": null });
      await userService.sendMobileNoVerificationCode(params.phoneNumber, "login");
      res.json({ "error": false, "message": `Login otp send successfully!. Please check your mobile No: ${params.phoneNumber}`, "data": null });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  async verifyLoginOtp(req, res, next) {
    try {
      let params = req.body;
      if (!params.phoneNumber && !params.otp) {
        res.json({ "error": true, "message": "'Insufficient request parameters! phone no and otp is required.'" })
      }
      let user = await userService.getUser({ "phoneNumber": params.phoneNumber });
      if (!user) res.json({ "error": true, "message": "User phone Number not exist" });
      let result = await userService.verifyMobileNoVerificationCode(params.phoneNumber, params.otp, "login");
      if (result.flag) {
        res.json({ "error": true, "message": result.message });
      }
      generalConfig.generateJwtToken(
        user.id,
        user.email,
        user.userType,

        function (val) {
          res.json({
            "error": false, "message": "Login Successfully!",
            "data": user,
            "newToken": val.newToken,
          });
        }
      );
      res.json({ "error": false, "message": result.message });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

}

module.exports = new AuthController();
