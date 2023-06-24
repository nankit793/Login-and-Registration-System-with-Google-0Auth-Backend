const express = require("express");

const app = express();
app.use("/admin", require("./admin/adminIndex"));
app.use("/api", require("./api/apiIndex"));
module.exports = app;
