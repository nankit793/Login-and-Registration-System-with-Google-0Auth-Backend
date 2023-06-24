const express = require("express");
const app = express();

app.use("/saveHoroscope", require("./callAndSaveData"));
app.use("/getHoroscopeData", require("./getHoroscopeData"));
module.exports = app;
