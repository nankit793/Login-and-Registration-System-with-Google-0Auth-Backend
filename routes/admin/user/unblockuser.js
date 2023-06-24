const express = require("express");
const adminVerification = require("@middlewares/adminVerification");
const app = express();
const { itemRequired, serverError, userNotExist } = require("@errors/general");
const Users = require("@models/user/UserSchema");

app.post("/", adminVerification, async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.json({ message: itemRequired("username", res) });
    }
    const user = await Users.findOne({ username }).select("+blocked");
    if (!user) {
      return res.json({ message: userNotExist(res) });
    }
    user.blocked = false;
    await user.save();
    res.status(200).json({ message: "user has been blocked", data: user });
  } catch (error) {
    return res.json({
      message: serverError("", res),
    });
  }
});

module.exports = app;
