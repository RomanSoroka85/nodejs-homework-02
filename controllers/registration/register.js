const { BadRequest, Conflict } = require("http-errors");
const { SITE_NAME } = process.env;
const { User, joiRegisterSchema } = require("../../models/user");
const bcrypt = require("bcryptjs");
const msg = require("../../helpers");
const { nanoid } = require("nanoid");

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

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const verificationToken = nanoid();
    const newUser = await User.create({
      name,
      email,
      verificationToken,
      password: hashPassword,
    });
    const mail = {
      to: email,
      subject: "Verification email",
      html: `<a target = "_blank" href="${SITE_NAME}/api/users/verify/${verificationToken}">Verified you're email</a>`,
    };
    await msg(mail);
    res.status(201).json({ email, name });
  } catch (error) {
    next(error);
  }
};
module.exports = register;
