const express = require("express");
const userVerification = require("../../middlewares/userVerification");
const app = express();

app.post("/", userVerification, (req, res) => {
  res.status(200).json({ message: "user kundli data saved" });
});

module.exports = app;
