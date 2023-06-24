const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  phoneNumber: { type: String },
  adresses: {
    type: [
      {
        street: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        postalCode: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
      },
    ],
  },
  blocked: { type: Boolean, default: false, select: false },
  password: { type: String, select: false },
  name: String,
  accountVerfication: { type: Boolean, default: false },
  verifyOTP: {
    type: String,
    select: false,
  },
  forgotPassOTP: {
    type: String,
    default: null,
    select: false,
  },
});

module.exports = mongoose.model("user", userSchema);
