const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,         // TLS port
  secure: false,     // false for TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: `"Event App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
    console.log(`Email sent to ${to}`);
  } catch (err) {
    console.error(`Failed to send email to ${to}:`, err.message);
  }
};

module.exports = sendEmail;
