const express = require("express");
const app = express();

app.use("/basic", require("./basic"));
app.use("/1", require("./kundli"));
app.use("/2", require("./kp"));
module.exports = app;
