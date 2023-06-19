const express = require("express");
const userVerification = require("@middlewares/userVerification");
const app = express();
const { itemsRequired, itemNotValid, serverError } = require("@errors/general");
const { phoneNumberVerify } = require("@controllers/verifiers");
app.post("/", userVerification, async (req, res) => {
  try {
    const { phoneNumber, name, adresses } = req.body;
    if (!phoneNumber || !name) {
      return res.json({
        message: itemsRequired("Phone number, name", res),
      });
    }
    if (!phoneNumberVerify(phoneNumber)) {
      return res.json({
        message: itemNotValid("Phone number", res),
      });
    }
    let user = req.user;
    if (user) {
      user.phoneNumber = phoneNumber;
      (user.name = name), (user.adresses = adresses);
      await user.save();
      return res.json({ message: "user information updated" });
    }

    return res.status(401).json({ message: "try again later" });
  } catch (error) {
    return res.json({
      message: serverError("", res),
    });
  }
});

module.exports = app;
