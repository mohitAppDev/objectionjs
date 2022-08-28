const ejs = require("ejs");
const path = require("path");
const mail = require("../utils/email");

const sendVerificationOtpEmail = async ({  email, otp, subject }) => {
  const requiredPath = path.join(__dirname, "../views/verifyOtpMail.ejs");

  const data = await ejs.renderFile(requiredPath, {
     email: email, otp: otp
  });

  var mainOptions = {
    from: '"Wafer" admin@gmail.com',
    to: email,
    subject: subject,
    html: data,
  };

  const mailResponse = await mail.sendMail(mainOptions); 
  return mailResponse;
};


const welcomeEmail = async ( email, subject ) => {
    const requiredPath = path.join(__dirname, "../views/welcomeMail.ejs");
    const data = await ejs.renderFile(requiredPath);
    var mainOptions = {
      from: '"Zeksta" zesta.technology@zeksta.com',
      to: email,
      subject: subject,
      html: data,
    };
  
    const mailResponse = await mail.sendMail(mainOptions); 
    return mailResponse;
  };

module.exports = {
    sendVerificationOtpEmail,
    welcomeEmail
}
