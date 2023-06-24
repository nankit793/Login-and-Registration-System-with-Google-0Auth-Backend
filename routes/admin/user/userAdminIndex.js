const express = require("express");
const app = express();

app.use("/block", require("./blockuser"));
app.use("/unblock", require("./unblockuser"));

module.exports = app;
