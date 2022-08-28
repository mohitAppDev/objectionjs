/**
 * index route file of admin platform.
 * @description: exports all routes of admin platform.
 */
 const express = require('express');
 const router = express.Router();
 var passport = require("../../../config/passport")();

 router.use('/client/', require('./auth'));
 router.use('/client/profile', passport.authenticate(), require('./profile'));
 
 module.exports = router;