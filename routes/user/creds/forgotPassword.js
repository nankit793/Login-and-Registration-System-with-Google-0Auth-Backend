const express = require("express");
const app = express();
const {
  itemsRequired,
  itemsNotValid,
  itemNotValid,
  userNotExist,
  serverError,
} = require("@errors/general");
const USERS = require("@models/user/UserSchema");
const {
  emailVerification,
  passwordVerification,
  otpVerification,
} = require("@controllers/verifiers");
const { generateHash, compareHash } = require("@controllers/bcrypt");

app.post("/", async (req, res) => {
  const { username, password, confirmPassword, otp } = req.body;
  if (!username || !password || !confirmPassword || !otp) {
    return res.json({
      message: itemsRequired("username, password, confirmPassword, OTP", res),
    });
  }
  if (password != confirmPassword) {
    return res.json({
      message: itemsNotValid("password, confirmPassword", res),
    });
  }
  if (
    emailVerification(username) &&
    passwordVerification(password) &&
    otpVerification(otp)
  ) {
    let user = await USERS.findOne({ username }).select(
      "+accountVerfication +forgotPassOTP"
    );

    if (!user) {
      return res.status(403).json({ message: userNotExist(res) });
    }
    if (!(user && user.accountVerfication)) {
      return res
        .status(401)
        .json({ message: "Account is not verified, verify first" });
    }

    const otpCompare = await compareHash(otp, user.forgotPassOTP);
    if (!otpCompare) {
      return res.status(400).json({ message: itemNotValid("OTP", res) });
    }

    const hashedPassword = await generateHash(req.body.password);
    if (hashedPassword && hashedPassword.hashed) {
      user.password = hashedPassword.hashed;
      user.forgotPassOTP = null;
      //send mail to user
      await user.save();
      return res.status(200).json({
        message: "your new password has been set!",
      });
    }
    return res.status(401).json({ message: serverError("", res) });
  }
  return res.json({ message: itemsNotValid("username, password, otp", res) });
});

module.exports = app;
