const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { DB_HOST } = require("./config");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./routes/api/contacts");
const { Contact } = require("./models");
dotenv.config();

const newContact = {
  name: "Roman",
  email: "r@gov.ua",
};

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const result = await Contact.create(newContact);
    console.log(result);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", router);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
