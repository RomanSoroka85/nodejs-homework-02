const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");
const router = require("./routes/api/contacts");
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const { DB_HOST } = require("./config");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { Contact } = require("./models");

dotenv.config();

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    await Contact.create();
  })
  .then(async (id) => {
    await Contact.findByIdAndUpdate(id);
  })
  .then(async (id) => {
    await Contact.findById(id);
  })
  .then(async (id) => {
    await Contact.findByIdAndDelete(id);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/contacts", router);
app.use(express.static("public"));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
