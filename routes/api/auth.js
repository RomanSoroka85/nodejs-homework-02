const express = require("express");

const { autenticate } = require("../../middlewares");
const { register, login, logout } = require("../../controllers/registration");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", autenticate, logout);

module.exports = router;
