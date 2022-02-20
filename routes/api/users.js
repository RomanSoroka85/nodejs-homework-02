const express = require("express");
const { autenticate } = require("../../middlewares");
const router = express.Router();
const { User } = require("../../models/user");
const { SITE_NAME } = process.env;
const msg = require("../../helpers");
const { NotFound, BadRequest } = require("http-errors");

router.get("/current", autenticate, async (req, res, next) => {
  try {
    const { email, name } = req.user;
    res.json({ email, name });
  } catch (error) {
    next(error);
  }
});
router.get("/verify/:verificationToken", async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw NotFound();
    }
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });
    res.json({
      status: 200,
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/verify", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new BadRequest("missing required field email");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw NotFound();
    }
    if (user.verify) {
      throw BadRequest("Verification has already been passed");
    }
    const { verificationToken } = user;
    const mail = {
      to: email,
      subject: "Verification email",
      html: `<a target = "_blank" href="${SITE_NAME}/api/users/verify/${verificationToken}">Verified you're email</a>`,
    };
    await msg(mail);
    res.json({ email });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
