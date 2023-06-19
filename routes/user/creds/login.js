const express = require("express");
const app = express();
const {
  itemsRequired,
  itemsNotValid,
  serverError,
  userNotExist,
} = require("@errors/general");
const { attachCokiesToRes, generateOTP } = require("@controllers/general");
const USERS = require("@models/user/UserSchema");
const {
  emailVerification,
  passwordVerification,
} = require("@controllers/verifiers");
const { compareHash, generateHash } = require("@controllers/bcrypt");

app.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({
        message: itemsRequired("username, password", res),
      });
    }
    if (emailVerification(username) && passwordVerification(password)) {
      let user = await USERS.findOne({ username }).select("+password");
      if (!user) {
        return res.json({ message: userNotExist(res) });
      }
      if (user && user.accountVerfication) {
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
      } else {
        const OTP = generateOTP();
        const otpHash = await generateHash(OTP);
        if (otpHash && otpHash.hashed) {
          user.verifyOTP = otpHash.hashed;
          //send mail to user
          await user.save();
        } else {
          throw Error("");
        }
        return res.status(401).json({
          otp: OTP,
          message: "Your account is not verified, Check your mail",
        });
      }
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
