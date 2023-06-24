const express = require("express");
const app = express();
const adminVerification = require("@middlewares/adminVerification");

app.use("/register", require("./singOn/register"));
app.use("/login", require("./singOn/login"));
app.use("/getInfo", adminVerification, require("./getUserDetails"));
app.use("/user", adminVerification, require("./user/userAdminIndex"));

module.exports = app;
