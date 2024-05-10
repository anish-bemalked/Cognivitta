const axios = require("axios");
const applicationData = require("../applicationData/applicationData");
const { response } = require("express");

const getProfile = async (req, res) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://api.upstox.com/v2/user/profile",
    headers: {
      Accept: "application/json",
    },
  };
  config.headers["Authorization"] = `Bearer ${applicationData.accessTocken}`;

  const response = await axios(config);
  res.send(response.data);
};

const getFunds = async (req, res) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://api.upstox.com/v2/user/get-funds-and-margin",
    headers: {
      Accept: "application/json",
    },
  };
  config.headers["Authorization"] = `Bearer ${applicationData.accessTocken}`;

  const response = await axios(config);
  res.send(response.data);
};

module.exports = {
  getProfile,
  getFunds,
};
