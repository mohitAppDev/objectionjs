const Profile = require('../models/profile');
const _ = require('lodash');

class ProfileService {
  getProfile(query) {
    return Profile.query().findOne(query);
  }

  addProfile(data) {
    let params = _.pick(data, ['userId','address','age','gender','workExperience','presentCompany','ctc','employmentStatus','isAvailableToHire','isAvailableToFreelance']);
    return Profile.query().insert({
      ...params
    })
  }

  updateProfileById(data) {
    let id = data.userId;
    let params = _.pick(data, ['address','age','gender','workExperience','presentCompany','ctc','employmentStatus','isAvailableToHire','isAvailableToFreelance']);
    return Profile.query().patch({
      ...params
    }).where("userId", id)
  }

  updateProfileByAdmin(data) {
    let id = data.id;
    let params = _.pick(data, ['address','age','gender','workExperience','presentCompany','ctc','employmentStatus','isAvailableToHire','isAvailableToFreelance']);
    return Profile.query().patch({
      ...params
    }).where("id", id)
  }

  deleteProfileByAdmin(data) {
    let id = data.id;
    return Profile.query().deleteById(id);
  }

}

module.exports = new ProfileService();
