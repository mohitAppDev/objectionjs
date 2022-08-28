const User = require('../models/user');
const _ = require('lodash');
require('dotenv').config();
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const redisUrl = 'redis://127.0.0.1:6379';
const Redis = require('ioredis');
const redisClient = new Redis(redisUrl);

class UserService {
  getUser(query) {
    return User.query().findOne(query);
  }

  addUser(data) {
    let params = _.pick(data, ["firstName", "lastName", "email", "phoneNumber", "userType"]);
    return User.query().insert({
      ...params
    })
  }

  updateUser(data, type) {
    if (type == "phone") {
      return User.query().patch({
        isPhoneNoVerify: true
      }).where("phoneNumber", data)
    } else {
      return User.query().patch({
        isEmailVerify: true
      }).where("email", data)
    }
  }

  updateUserById(data) {
    let id = data.id;
    let params = _.pick(data, ["firstName", "lastName"]);
    return User.query().patch({
      ...params
    }).where("id", id)
  }


  async sendMobileNoVerificationCode(phoneNo, type) {
    try {
      const randomNumber = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
      await redisClient.set(`${phoneNo}_${type}`, `${randomNumber}`, 'EX', 600);
      this.sendSMS(phoneNo, `Your mobile verification code is ${randomNumber}`);
    } catch (error) {
      console.error(error);
    }
  }

  async verifyMobileNoVerificationCode(phoneNo, code, type) {
    try {
      let res;
      const value = await redisClient.get(`${phoneNo}_${type}`);
      if (value == code) {
        res = {
          flag: false,
          message: "Mobile number verify successfully!"
        }
      } else {
        res = {
          flag: true,
          message: "Invalid OTP"
        }
      }
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  sendSMS(phoneNo, message) {
    return client.messages.create({
      from: +19783916587,
      to: `+91${phoneNo}`,
      body: message,
    });
  }
}

module.exports = new UserService();
