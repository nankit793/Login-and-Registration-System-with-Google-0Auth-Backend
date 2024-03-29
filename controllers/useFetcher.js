// var btoa = require("btoa");
const fetch = require("cross-fetch");

const useFetcher = async (url, bodyData = {}) => {
  // var myHeaders = new Headers();

  // myHeaders.append("Authorization", basicAuth);
  // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  Object.keys(bodyData).map((key) => urlencoded.append(key, bodyData[key]));

  var requestOptions = {
    method: "POST",
    headers: {
      // set content type
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    body: urlencoded,
    redirect: "follow",
  };

  const res = fetch(`your external URL`, requestOptions)
    .then(async (response) => {
      const res = await response.json();
      return {
        status: response.status,
        statusText: response.statusText,
        res,
      };
    })
    // .then((result) => {
    //   return result;
    // })
    .catch((error) => {
      console.log("error", error);
      return error;
    });

  return res;
};

module.exports = { useFetcher };
