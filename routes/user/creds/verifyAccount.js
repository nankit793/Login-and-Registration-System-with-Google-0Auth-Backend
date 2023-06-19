const express = require("express");
const app = express();
const {
  itemsRequired,
  userNotExist,
  itemsNotValid,
  serverError,
  itemNotValid,
} = require("@errors/general");
const USERS = require("@models/user/UserSchema");
const {
  emailVerification,
  otpVerification,
} = require("@controllers/verifiers");
const { compareHash } = require("@controllers/bcrypt");

app.post("/", async (req, res) => {
  try {
    const { otp, username } = req.body;
    if (!otp || !username) {
      return res
        .status(403)
        .json({ message: itemsRequired("OTP, username", res) });
    }
    if (emailVerification(username) && otpVerification(otp)) {
      let user = await USERS.findOne({ username }).select(
        "+verifyOTP +accountVerfication"
      );
      if (!user) {
        return res.status(403).json({ message: userNotExist(res) });
      }
      if (user && user.accountVerfication) {
        return res.status(201).json({
          message: "Account is already verified",
        });
      }
      const otpCompare = await compareHash(otp, user.verifyOTP);
      if (!otpCompare) {
        return res.status(400).json({ message: itemNotValid("OTP", res) });
      }
      user.accountVerfication = true;
      user.verifyOTP = null;
      await user.save();
      return res.status(200).json({
        message: "User is successfully verified",
      });
    }
    return res.json({
      message: itemsNotValid("Username or OTP", res),
    });
  } catch (error) {
    return res.json({
      message: serverError("", res),
    });
  }
});
module.exports = app;
