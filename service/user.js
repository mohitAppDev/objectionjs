const User = require('../models/user');
const _ = require('lodash');

class UserService {
  getAllUser() {
    return User.query().select()
    .where('userType', '!=', 1);
  }

  getUser(query) {
    return User.query().findOne(query);
  }

  deleteUserByAdmin(data) {
    let id = data.id;
    return User.query().deleteById(id);
  }

  updateUserDetail(data) {
    let id = data.id
    let params = _.pick(data, ["firstName", "lastName"]);
    return User.query().patch({
      ...params
    }).where("id", id)
  }

}

module.exports = new UserService();
