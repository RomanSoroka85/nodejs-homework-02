const { User } = require("../../models/user");

const logout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.body._id, { token: null });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
module.exports = logout;
