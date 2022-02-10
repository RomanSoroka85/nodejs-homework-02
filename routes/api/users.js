const express = require("express");
const { authenticate, upload } = require("../../middlewares");
const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models/user");
const router = express.Router();
router.get("/current", authenticate, async (req, res, next) => {
  try {
    const { email, name } = req.user;
    res.json({ email, name });
  } catch (error) {
    next(error);
  }
});

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      const { _id: id } = req.user;
      //fs.mkdir
      const [extension] = originalname.split(".").reverse();
      const filename = `${id}.${extension}`;
      const { path: tempUpload, originalname } = req.file;
      const resultUpload = path.join(avatarsDir, filename);

      await fs.rename(tempUpload, resultUpload);
      const avatarURL = `/avatars/${filename}`;
      await User.findByIdAndUpdate(id, avatarURL);
      res.json({ avatarURL });
    } catch (error) {
      await fs.unlink(tempUpload);
      error.message = "save error";
      next(error);
    }
  }
);

module.exports = router;
