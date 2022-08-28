/**
 * index route file of admin platform.
 * @description: exports all routes of admin platform.
 */
 const express = require('express');
 const router = express.Router();
 var passport = require("../../../config/passport")();

 router.use('/admin', require('./auth'));
 router.use('/admin/profile', passport.authenticate(), require('./profile'));
 router.use('/admin/user', passport.authenticate(), require('./user'));
 
 module.exports = router;