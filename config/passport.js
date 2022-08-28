// auth.js
const passport = require("passport");
const passportJWT = require("passport-jwt");
const generalConfig = require('./generalConfig');
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const _ = require('lodash');

module.exports = function async () {

  let params = {
    secretOrKey: generalConfig.secretKey,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt")
  };
  let strategy = new Strategy(params, function (payload, done) {
    let currentDate = Date.now();
    if (payload.expDate <= currentDate) {
      let difference = currentDate - payload.expDate;
      let minutesDifference = Math.floor(difference / 1000 / 60);
      if (minutesDifference >= 1440) {
        // 1440 min = 1 day
        return done(new Error("Token is expired. Please login again."), null);
      } else {
        // Send new token if expire
        generalConfig.generateJwtToken(payload.id, function (res) {
          return done(null, { id: payload.id, token_expired: true, newToken: res.newToken });
        });
      }
    } else {
      return done(null, { id: payload.id, token_expired: false });
    }
  });

  passport.use(strategy);
  return {
    initialize: function () {
      return passport.initialize();
    },
    
    authenticate: function () {
      return passport.authenticate("jwt", generalConfig.jwtSession);
    }

  };
};
