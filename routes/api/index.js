const express = require("express");
const app = express();

app.use("/kundli", require("./kundli/index"));
app.use("/horocharts", require("./horoscope/HoroCharts"));
module.exports = app;
