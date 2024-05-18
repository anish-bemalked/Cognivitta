const axios = require("axios");

const logout = async (req, res) => {
  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: "https://api.upstox.com/v2/logout",
    headers: {
      Accept: "application/json",
    },
  };
  config.headers["Authorization"] = `Bearer ${req.body.token}`;

  const response = await axios(config);

  res.send(response.data);
};

module.exports = {
  logout,
};
