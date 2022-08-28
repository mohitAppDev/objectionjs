const { Model } = require('objection');

class Profile extends Model {
  static get tableName() {
    return 'profile';
  }
}

module.exports = Profile;