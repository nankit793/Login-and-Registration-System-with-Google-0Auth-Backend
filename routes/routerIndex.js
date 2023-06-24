const express = require("express");

const app = express();
app.use("/api", require("./api/apiIndex"));
app.use("/admin", require("./admin/adminIndex"));
module.exports = app;
