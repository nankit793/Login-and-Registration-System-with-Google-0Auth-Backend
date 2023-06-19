const express = require("express");
const app = express();
const {
  itemsRequired,
  itemsNotValid,
  userAlreadyExists,
  serverError,
} = require("@errors/general");
const USERS = require("@models/user/UserSchema");
const {
  emailVerification,
  passwordVerification,
} = require("@controllers/verifiers");
const { generateHash } = require("@controllers/bcrypt");
const { generateOTP } = require("@controllers/general");

app.post("/", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({
      message: itemsRequired("username, password", res),
    });
  }
  if (emailVerification(username) && passwordVerification(password)) {
    let user = await USERS.findOne({ username });
    if (user) {
      if (user && !user.accountVerfication) {
        const OTP = generateOTP();
        const otpHash = await generateHash(OTP);
        if (otpHash && otpHash.hashed) {
          user.verifyOTP = otpHash.hashed;
          //send mail to user
          await user.save();
          return res.status(200).json({
            message: "Already Exist, Confirm the OTP for complete registration",
            otp: OTP,
          });
        }
        return res.status(200).json({
          message: "Please confirm the OTP for complete registration",
        });
      }
      return res.json({ message: userAlreadyExists(res) });
    }
    user = await USERS(req.body);
    const hashedPassword = await generateHash(req.body.password);
    const OTP = generateOTP();
    const otpHash = await generateHash(OTP);
    if (hashedPassword && hashedPassword.hashed && otpHash && otpHash.hashed) {
      user.password = hashedPassword.hashed;
      user.verifyOTP = otpHash.hashed;
      //send mail to user
      await user.save();
      return res.status(200).json({
        message: "Please confirm the OTP for complete registration",
        otp: OTP,
      });
    }
    return res.json({ message: serverError("", res) });
  }
  return res.json({ message: itemsNotValid("username, password", res) });
});

module.exports = app;
