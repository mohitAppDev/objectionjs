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
      params.userType = userType.admin;
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

}

module.exports = new AuthController();
