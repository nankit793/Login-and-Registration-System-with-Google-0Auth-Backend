const express = require("express");
const { useFetcher } = require("../../../controllers/useFetcher");
const app = express();

app.post("/", async (req, res) => {
  const bodyData = req.body;
  const url = "/horo_chart_image";
  const zodiac = req.params;
  const response = await useFetcher(`${url}/${zodiac}`, bodyData);
  if (response.status === 200) {
    return res
      .status(response.status)
      .json({ status: true, res: response.res });
  } else {
    return res.status(response.status).json(response.res);
  }
});
app.post("/combined", async (req, res) => {
  const bodyData = req.body;
  const p1 = await useFetcher("/horo_chart_image/chalit", bodyData);
  const p2 = await useFetcher("/horo_chart_image/sun", bodyData);
  const p3 = await useFetcher("/horo_chart_image/moon", bodyData);
  const p4 = await useFetcher("/horo_chart_image/d1", bodyData);
  const p5 = await useFetcher("/horo_chart_image/d2", bodyData);
  const p6 = await useFetcher("/horo_chart_image/d3", bodyData);
  const p7 = await useFetcher("/horo_chart_image/d4", bodyData);
  const p8 = await useFetcher("/horo_chart_image/d5", bodyData);
  const p9 = await useFetcher("/horo_chart_image/d7", bodyData);
  const p10 = await useFetcher("/horo_chart_image/d8", bodyData);
  const p11 = await useFetcher("/horo_chart_image/d9", bodyData);
  const p12 = await useFetcher("/horo_chart_image/d12", bodyData);
  const p13 = await useFetcher("/horo_chart_image/d16", bodyData);
  const p14 = await useFetcher("/horo_chart_image/d20", bodyData);
  const p15 = await useFetcher("/horo_chart_image/d24", bodyData);
  const p16 = await useFetcher("/horo_chart_image/d27", bodyData);
  const p17 = await useFetcher("/horo_chart_image/d30", bodyData);
  const p18 = await useFetcher("/horo_chart_image/d40", bodyData);
  const p19 = await useFetcher("/horo_chart_image/d45", bodyData);
  const p20 = await useFetcher("/horo_chart_image/d60", bodyData);
  const p21 = await useFetcher("/horo_chart_image/d10", bodyData);
  var data = {};
  if (p1.status === 200 && p1.res) {
    data.chalit = p1.res;
  }
  if (p2.status === 200 && p2.res) {
    data.sun = p2.res;
  }
  if (p3.status === 200 && p3.res) {
    data.moon = p3.res;
  }
  if (p4.status === 200 && p4.res) {
    data.d1 = p4.res;
  }
  if (p5.status === 200 && p5.res) {
    data.d2 = p5.res;
  }
  if (p6.status === 200 && p6.res) {
    data.d3 = p6.res;
  }
  if (p7.status === 200 && p7.res) {
    data.d4 = p7.res;
  }
  if (p8.status === 200 && p8.res) {
    data.d5 = p8.res;
  }
  if (p9.status === 200 && p9.res) {
    data.d7 = p9.res;
  }
  if (p10.status === 200 && p10.res) {
    data.d8 = p10.res;
  }
  if (p11.status === 200 && p11.res) {
    data.d9 = p11.res;
  }
  if (p12.status === 200 && p12.res) {
    data.d12 = p12.res;
  }
  if (p13.status === 200 && p13.res) {
    data.d16 = p13.res;
  }
  if (p14.status === 200 && p14.res) {
    data.d20 = p14.res;
  }
  if (p15.status === 200 && p15.res) {
    data.d24 = p15.res;
  }
  if (p16.status === 200 && p16.res) {
    data.d27 = p16.res;
  }
  if (p17.status === 200 && p17.res) {
    data.d30 = p17.res;
  }
  if (p18.status === 200 && p18.res) {
    data.d40 = p18.res;
  }
  if (p19.status === 200 && p19.res) {
    data.d45 = p19.res;
  }
  if (p20.status === 200 && p20.res) {
    data.d60 = p19.res;
  }
  if (p21.status === 200 && p21.res) {
    data.d10 = p21.res;
  }

  res.status(200).json({ state: true, res: data });
});
module.exports = app;
