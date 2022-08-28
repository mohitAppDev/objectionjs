const userService = require('../../service/user');
const _ = require("lodash");
const jwt_decode = require("jwt-decode");

class UserController {

  async getUser(req, res, next) {
    try {
      var decoded = jwt_decode(req.headers.authorization);
      let id = decoded.id;
      const user = await userService.getUser({id: id});
      if (!user) res.json({ "error": true, "message": "User not exist!", "data": null });
            res.json({ "error": false, "message": "User detail found!", "data": user });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      var decoded = jwt_decode(req.headers.authorization);
      let params = req.body;
      params.id = decoded.id;
      const userDetail = await userService.getUser({ "id": params.id });
      if (!userDetail) {
        res.json({ "error": true, "message": "User not exist!", "data": null });
      }
      const update = await userService.updateUserDetail(params);
      if (!update) res.json({ "error": true, "message": "Issue in profile updation!", "data": null });
      res.json({ "error": false, "message": "Profile update successfully!", "data": update });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      var decoded = jwt_decode(req.headers.authorization);
      let id = decoded.id;
      const userDetail = await userService.getUser({ "id": id });
      if (!userDetail) {
        res.json({ "error": true, "message": "User not exist!", "data": null });
      }
      const del = await userService.deleteUserByAdmin({"id": id});
      if (!del) res.json({ "error": true, "message": "Issue in user deletion!", "data": null });
      res.json({ "error": false, "message": "User deleted successfully!", data: null });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

}

module.exports = new UserController();
