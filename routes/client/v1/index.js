/**
 * index route file of admin platform.
 * @description: exports all routes of admin platform.
 */
 const express = require('express');
 const router = express.Router();
 var passport = require("../../../config/passport")();

 router.use('/client/', require('./auth'));
 router.use('/client/profile', passport.authenticate(), require('./profile'));
 router.use('/client/user', passport.authenticate(), require('./user'));
 
 module.exports = router;