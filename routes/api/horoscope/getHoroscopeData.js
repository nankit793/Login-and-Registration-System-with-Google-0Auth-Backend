const express = require("express");
const HoroscopeSchema = require("@models/astroverse/HoroscopeSchema");
const app = express();
const { itemNotValid, serverError } = require("@errors/general");

app.post("/", async (req, res) => {
  try {
    const type = req.query;
    if (!type && !["next", "previous", "daily", "monthly"].includes(type)) {
      return res.json({
        message: itemNotValid("Type", res),
      });
    }
    const result = await HoroscopeSchema.findOne(type);
    res
      .status(200)
      .json({ message: "horoscope data fecthed", res: result?.data });
  } catch (error) {
    console.log(error.message);
    return res.json({ message: serverError("", res) });
  }
});
module.exports = app;
