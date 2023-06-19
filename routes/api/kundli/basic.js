const express = require("express");
const { useFetcher } = require("../../../controllers/useFetcher");
const app = express();

app.post("/", async (req, res) => {
  const bodyData = req.body;
  const url = "/birth_details";
  const urlTwo = "/astro_details";
  const data = {};
  const response = await useFetcher(url, bodyData);
  const responseTwo = await useFetcher(urlTwo, bodyData);
  if (response.status === 200) {
    data.birthDetails = response.res;
  }
  if (responseTwo.status === 200) {
    data.avakhada = responseTwo.res;
  }
  return res.status(response.status).json({ status: true, res: data });
});
module.exports = app;
