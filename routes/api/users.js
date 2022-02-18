const express = require("express");
const { autenticate } = require("../../middlewares");
const router = express.Router();

router.get("/current", autenticate, async (req, res, next) => {
  try {
    const { email, name } = req.user;
    res.json({ email, name });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
