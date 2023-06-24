const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: String,
  name: String,
});

module.exports = mongoose.model("admins", AdminSchema);
