const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

console.log(avatarsDir);

const avatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const [extension] = originalname.split(".").reverse();
  const filename = `${id}.${extension}`;
  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(tempUpload, resultUpload);
  const avatarURL = `/avatars/${filename}`;
  await User.findByIdAndUpdate(id, avatarURL);
  res.json({ avatarURL });
};

module.exports = avatar;
