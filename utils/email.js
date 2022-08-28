const nodemailer = require("nodemailer");
const _ = require('lodash');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// checking connection
transporter.verify(function (error, success) {
  if (error) {
    console.error(error);
  }
});

module.exports = transporter;
