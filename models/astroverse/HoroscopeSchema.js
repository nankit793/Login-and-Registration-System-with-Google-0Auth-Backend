const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  type: { type: String, required: true },
  data: {},
});

module.exports = mongoose.model("horoscopeData", AdminSchema);
