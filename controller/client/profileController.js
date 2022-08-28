const { genderType, employementStatus } = require('../../constant/profileConstant');
const profileService = require('../../service/profile');
const _ = require("lodash");
const jwt_decode = require("jwt-decode");

class ProfileController {

  async getProfile(req, res, next) {
    try {
      var decoded = jwt_decode(req.headers.authorization);
      let id = decoded.id;
      const user = await profileService.getProfile({userId: id});
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  async upsertProfile(req, res, next) {
    try {
      var decoded = jwt_decode(req.headers.authorization);
      let params = req.body;
      params.userId = decoded.id;
      if (!params.presentCompany && !params.ctc) {
        res.json({ "error": true, "message": "'Insufficient request parameters! present company and ctc is required.'" })
      }
      const userDetail = await profileService.getProfile({ "userId": params.userId });
      if (userDetail) {
        const update = await profileService.updateProfileById(params);
        if (!update) res.json({ "error": true, "message": "Issue in profile updation!", "data": null });
        res.json({ "error": false, "message": "Profile update successfully!", "data": userDetail });
      }
      const create = await profileService.addProfile(params);
      if (!create) res.json({ "error": true, "message": "Issue in adding user profile!", "data": null });
      res.json({ "error": false, "message": "Profile added successfully!", "data": create });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
}

module.exports = new ProfileController();
