const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const msg = async (data) => {
  try {
    const email = { ...data, from: "patriotroma9@gmail.com" };
    await sgMail.send(email);

    return true;
  } catch (error) {
    throw error;
  }
};
module.exports = msg;
