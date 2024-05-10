const axios = require("axios");
const applicationData = require("../applicationData/applicationData");

const getPositions = async (req, res) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://api.upstox.com/v2/portfolio/short-term-positions",
    headers: {
      Accept: "application/json",
    },
  };
  config.headers["Authorization"] = `Bearer ${req.body.token}`;

  const response = await axios(config);
  res.send(response.data);
};

module.exports = {
  getPositions,
};
