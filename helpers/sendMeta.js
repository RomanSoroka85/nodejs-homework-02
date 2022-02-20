const nodemailer = require("nodemailer");
require("dotenv").config();
const { META_PASSWORD } = process.env;
const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: { user: "patriotroma9@meta.ua" },
  pass: META_PASSWORD,
};
const transporter = nodemailer.createTransport(nodemailerConfig);
module.exports = transporter;
const email = {
  to: "patriotroma9@gmail.com",
  from: "patriotroma9@meta.ua",
  subject: "New user",
  html: "send new user",
};
transporter
  .sendMail(email)
  .then(() => console.log("success"))
  .catch((error) => console.log(error.message));
