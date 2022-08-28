const profileService = require('../../service/profile');
const jwt_decode = require("jwt-decode");

class ProfileController {

  async updateProfile(req, res, next) {
    try {
      let params = req.body;
      if (!params.id) {
        res.json({ "error": true, "message": "'Insufficient request parameters! id is required.'" })
      }
      const userDetail = await profileService.getProfile({ "id": params.id });
      if (!userDetail) {
        res.json({ "error": true, "message": "User not exist!" })
      }
      const update = await profileService.updateProfileByAdmin(params);
      if (!update) res.json({ "error": true, "message": "Issue in profile updation!", "data": null });
      res.json({ "error": false, "message": "Profile update successfully!", "data": update });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  async deleteProfile(req, res, next) {
    try {
      var decoded = jwt_decode(req.headers.authorization);
      let uid = decoded.id;
      let id = req.params.id;
      if (!id) {
        res.json({ "error": true, "message": "'Insufficient request parameters! id is required.'" })
      }
      const userDetail = await profileService.getProfile({ "id": id });
      if (!userDetail) {
        res.json({ "error": true, "message": "User not exist!" })
      }
      let { userId } = userDetail;
      if(userId == uid) res.json({ "error": true, "message": "You not able to delete your profile!" });
      const update = await profileService.deleteProfileByAdmin(id);
      if (!update) res.json({ "error": true, "message": "Issue in profile updation!", "data": null });
      res.json({ "error": false, "message": "Profile update successfully!", "data": update });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }


}

module.exports = new ProfileController();
