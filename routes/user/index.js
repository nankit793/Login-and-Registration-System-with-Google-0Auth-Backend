const express = require("express");
const app = express();

app.use("/auth/google/siginOn", require("./creds/google"));
app.use("/auth/registration", require("./creds/registration"));
app.use("/auth/login", require("./creds/login"));
app.use("/auth/verifyAccount", require("./creds/verifyAccount"));
app.use("/auth/forgotPassword", require("./creds/forgotPassword"));
app.use("/auth/regenrateVerifyOTP", require("./creds/regenrateVerifyOTP"));
app.use("/auth/regenrateFPotp", require("./creds/regenrateFPotp"));
app.use("/savekundli", require("./saveKundliData"));

module.exports = app;
