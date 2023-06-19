const express = require("express");
const { useFetcher } = require("../../../controllers/useFetcher");
const app = express();

app.post("/", async (req, res) => {
  try {
    const bodyData = req.body;
    const url = "/planets";
    const urlTwo = "/major_vdasha";
    const data = {};
    const response = await useFetcher(url, bodyData);
    if (response.status === 200) {
      data.planets = response.res;
    }
    const responseTwo = await useFetcher(urlTwo, bodyData);
    if (responseTwo.status === 200) {
      data.vimshottari = responseTwo.res;
    }
    return res.status(response.status).json({ status: true, res: data });
  } catch (error) {
    return res.status(response.status).json({ status: false });
  }
});
module.exports = app;
