const express = require("express");
const app = express();
const {
  itemRequired,
  serverError,
  userNotExist,
  itemNotValid,
} = require("@errors/general");
const USERS = require("@models/user/UserSchema");
const { emailVerification } = require("@controllers/verifiers");
const { generateHash } = require("@controllers/bcrypt");
const { generateOTP } = require("@controllers/general");

app.post("/", async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.json({
        message: itemRequired("Username", res),
      });
    }
    if (emailVerification(username)) {
      let user = await USERS.findOne({ username });
      if (!user) {
        return res.status(403).json({ message: userNotExist(res) });
      }
      if (user && user.accountVerfication) {
        return res.status(201).json({ message: "Account is already verified" });
      }
      const OTP = generateOTP();
      const otpHash = await generateHash(OTP);
      if (otpHash && otpHash.hashed) {
        user.verifyOTP = otpHash.hashed;
        //send mail to user
        await user.save();
        return res.status(200).json({
          message: "Please confirm the OTP for complete registration",
          otp: OTP,
        });
      }
      throw Error("");
    }
    return res.json({ message: itemNotValid("username", res) });
  } catch (error) {
    return res.status(401).json({ message: serverError("", res) });
  }
});
module.exports = app;
