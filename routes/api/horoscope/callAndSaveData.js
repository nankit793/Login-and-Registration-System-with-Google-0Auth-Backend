const express = require("express");
const adminVerification = require("@middlewares/adminVerification");
const HoroscopeSchema = require("@models/astroverse/HoroscopeSchema");
const { useFetcher } = require("@controllers/useFetcher");
const app = express();
app.post("/", async (req, res) => {
  var { type } = req.query;
  var { day } = req.query;

  const bodyData = req.body;

  if (!type || !["daily", "monthly"].includes(type)) {
    return res.status(401).json({ message: "valid type required" });
  }
  if (type == "daily" && !["previous", "next", "today"].includes(day)) {
    return res.status(401).json({ message: "valid day required" });
  }
  if (type == "monthly") {
    day = "";
  }
  if (day == "today") {
    day = "";
  }
  const url = type == "daily" ? "sun_sign_prediction" : "horoscope_prediction";
  // console.log(`/sun_sign_prediction/${type}${day && `/${day}`}/aries`);
  var data = {};
  const p1 = await useFetcher(
    `/${url}/${type}${day && `/${day}`}/aries`,
    bodyData
  );
  if (p1.status === 200 && p1.res) {
    data.aries = p1.res;
  }
  const p2 = await useFetcher(
    `/${url}/${type}${day && `/${day}`}/taurus`,
    bodyData
  );
  if (p2.status === 200 && p2.res) {
    data.taurus = p2.res;
  }
  const p3 = await useFetcher(
    `/${url}/${type}${day && `/${day}`}/gemini`,
    bodyData
  );
  if (p3.status === 200 && p3.res) {
    data.gemini = p3.res;
  }
  const p4 = await useFetcher(
    `/${url}/${type}${day && `/${day}`}/cancer`,
    bodyData
  );
  if (p4.status === 200 && p4.res) {
    data.cancer = p4.res;
  }
  const p5 = await useFetcher(
    `/${url}/${type}${day && `/${day}`}/leo`,
    bodyData
  );
  if (p5.status === 200 && p5.res) {
    data.leo = p5.res;
  }
  const p6 = await useFetcher(
    `/${url}/${type}${day && `/${day}`}/virgo`,
    bodyData
  );
  if (p6.status === 200 && p6.res) {
    data.virgo = p6.res;
  }
  const p7 = await useFetcher(
    `/${url}/${type}${day && `/${day}`}/libra`,
    bodyData
  );
  if (p7.status === 200 && p7.res) {
    data.libra = p7.res;
  }
  const p8 = await useFetcher(
    `/${url}/${type}${day && `/${day}`}/scorpio`,
    bodyData
  );
  if (p8.status === 200 && p8.res) {
    data.scorpio = p8.res;
  }
  const p9 = await useFetcher(
    `/${url}/${type}${day && `/${day}`}/sagittarius`,
    bodyData
  );
  if (p9.status === 200 && p9.res) {
    data.sagittarius = p9.res;
  }
  const p10 = await useFetcher(
    `/${url}/${type}${day && `/${day}`}/capricorn`,
    bodyData
  );
  if (p10.status === 200 && p10.res) {
    data.capricorn = p10.res;
  }
  const p11 = await useFetcher(
    `/${url}/${type}${day && `/${day}`}/aquarius`,
    bodyData
  );
  if (p11.status === 200 && p11.res) {
    data.aquarius = p11.res;
  }
  const p12 = await useFetcher(
    `/${url}/${type}${day && `/${day}`}/pisces`,
    bodyData
  );
  if (p12.status === 200 && p12.res) {
    data.pisces = p12.res;
  }
  const result = await HoroscopeSchema.findOne({ type: day || type });
  result.data = data;
  await result.save();
  res
    .status(200)
    .json({ message: `${day || type}'s horoscope saved in Database` });
});
module.exports = app;
