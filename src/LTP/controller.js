const axios = require("axios");

const getLPT = async (req, res) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.upstox.com/v2/market-quote/ltp?instrument_key=${req.body.instrument_token}`,
    headers: {
      Accept: "application/json",
    },
  };
  config.headers["Authorization"] = `Bearer ${req.body.token}`;

  const response = await axios(config);

  res.send(Object.values(response.data.data)[0]);
};

module.exports = {
  getLPT,
};
