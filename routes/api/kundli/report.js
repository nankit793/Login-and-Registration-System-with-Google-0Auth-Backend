const express = require("express");
const { useFetcher } = require("../../../controllers/useFetcher");
const app = express();

app.post("/", async (req, res) => {
  try {
    const bodyData = req.body;
    const url = "/general_ascendant_report";
    const urlTwo = "/nakshatra_report";
    const data = {};
    const dataGeneral = {};
    const response = await useFetcher(url, bodyData);
    if (response.status === 200) {
      dataGeneral.ascendent = response.res;
    }
    const responseTwo = await useFetcher(urlTwo, bodyData);
    if (responseTwo.status === 200) {
      dataGeneral.nakshatra = responseTwo.res;
    }
    data.general = dataGeneral;

    const urlThree = "/rudraksha_suggestion";
    const urlFour = "/basic_gem_suggestion";
    const dataRemedies = {};
    const responseThree = await useFetcher(urlThree, bodyData);
    if (responseThree.status === 200) {
      dataRemedies.rudraksh = responseThree.res;
    }
    const responseFour = await useFetcher(urlFour, bodyData);
    if (responseFour.status === 200) {
      dataRemedies.gems = responseFour.res;
    }
    data.remedies = dataRemedies;

    const urlFive = "/manglik";
    const urlSix = "/kalsarpa_details";
    const urlSeven = "/sadhesati_current_status";
    const urlEight = "/sadhesati_life_details";
    const dataDosha = {};
    const responseFive = await useFetcher(urlFive, bodyData);
    if (responseFive.status === 200) {
      dataDosha.manglik = responseFive.res;
    }
    const responseSix = await useFetcher(urlSix, bodyData);
    if (responseSix.status === 200) {
      dataDosha.kalsarpa = responseSix.res;
    }
    const responseSeven = await useFetcher(urlSeven, bodyData);
    if (responseSeven.status === 200) {
      dataDosha.sadhesati = responseSeven.res;
    }
    const responseEight = await useFetcher(urlEight, bodyData);
    if (responseEight.status === 200) {
      dataDosha.sadhesatiTimeline = responseEight.res;
    }
    data.dasha = dataDosha;

    return res.status(response.status).json({ status: true, res: data });
  } catch (error) {
    return res.status(response.status).json({ status: false });
  }
});
module.exports = app;
