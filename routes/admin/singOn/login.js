const express = require("express");
const app = express();
const {
  itemsRequired,
  itemsNotValid,
  serverError,
  userNotExist,
} = require("@errors/general");
const { attachCokiesToRes } = require("@controllers/general");
const Admin = require("@models/astroverse/admins/Admins");
const {
  emailVerification,
  passwordVerification,
} = require("@controllers/verifiers");
const { compareHash } = require("@controllers/bcrypt");

app.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({
        message: itemsRequired("username, password", res),
      });
    }
    if (emailVerification(username) && passwordVerification(password)) {
      let user = await Admin.findOne({ username }).select("+password");
      if (!user) {
        return res.json({ message: userNotExist(res) });
      }
      const passwordCompare = await compareHash(
        req.body.password,
        user.password
      );
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ message: "Invalid Username or Password" });
      }
      const payload = {
        username: user.username,
      };
      await attachCokiesToRes(res, payload);
      return res.status(200).json({ message: "successfully login" });
    }
    return res.json({
      message: itemsNotValid("username, password", res),
    });
  } catch (error) {
    return res.json({
      message: serverError("", res),
    });
  }
});

module.exports = app;
