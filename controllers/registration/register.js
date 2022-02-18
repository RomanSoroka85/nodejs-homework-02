const { BadRequest, Conflict } = require("http-errors");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { User, joiRegisterSchema } = require("../../models/user");
const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
  try {
    const { error } = joiRegisterSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Already exist");
    }
    const msg = {
      to: email,
      from: "patriotroma9@gmail.com",
      subject: "Sending with Twilio SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    await User.create({ name, email, password: hashPassword });
    res.status(201).json({ email, name });
  } catch (error) {
    next(error);
  }
};
module.exports = register;
