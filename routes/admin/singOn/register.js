const express = require("express");
const app = express();
const {
  itemsRequired,
  itemsNotValid,
  userAlreadyExists,
  serverError,
} = require("@errors/general");
const {
  emailVerification,
  passwordVerification,
} = require("@controllers/verifiers");
const Admin = require("@models/app/admins/Admins");
const { generateHash } = require("@controllers/bcrypt");

app.post("/", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({
      message: itemsRequired("username, password", res),
    });
  }
  if (emailVerification(username) && passwordVerification(password)) {
    let user = await Admin.findOne({ username });
    if (user) {
      return res.json({ message: userAlreadyExists(res) });
    }
    user = await Admin(req.body);
    const hashedPassword = await generateHash(req.body.password);
    if (hashedPassword && hashedPassword.hashed) {
      user.password = hashedPassword.hashed;
      await user.save();
      return res.status(200).json({
        message: "admin registration complete",
      });
    }
    return res.json({ message: itemsNotValid("username, password", res) });
  }
  return res.json({ message: serverError("", res) });
});

module.exports = app;
