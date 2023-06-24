const express = require("express");
const app = express();

app.use("/kundli", require("./kundli/KundliIndex"));
app.use("/horocharts", require("./horoscope/HoroCharts"));
app.use("/horoscope", require("./horoscope/horoscopeIndex"));
module.exports = app;
