const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"TripHub" <no-reply@triphub.com>',
    to,
    subject,
    html,
  };

  console.log("Email credentials:", process.env.EMAIL_USER, process.env.EMAIL_PASS);
  await transporter.sendMail(mailOptions);};

module.exports = sendEmail;
