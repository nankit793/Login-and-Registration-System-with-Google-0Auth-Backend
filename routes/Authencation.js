const express = require("express");
const userVerification = require("../middlewares/userVerification");
const app = express();

app.post("/", userVerification, (req, res) => {
  const user = req.user;
  res.status(200).json({ message: "user authenticated", user });
});

module.exports = app;
