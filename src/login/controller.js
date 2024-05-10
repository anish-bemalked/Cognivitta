const axios = require("axios");
const applicationData = require("../applicationData/applicationData");

const login = async (req, res) => {
  res.send({
    url: `https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=${applicationData.apiKey}&redirect_uri=${applicationData.redirectUrl}`,
  });
};

const getCode = async (req, res) => {
  try {
    const query = req.query;

    const config = {
      method: "post",
      url: "https://api.upstox.com/v2/login/authorization/token",
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        client_id: applicationData.apiKey,
        client_secret: applicationData.apiSecret,
        redirect_uri: applicationData.redirectUrl,
        grant_type: "authorization_code",
      },
    };

    config.data["code"] = query.code;

    const response = await axios(JSON.parse(JSON.stringify(config)));

    res.send({ token: response.data.access_token });
  } catch (e) {
    console.log(typeof e);
    res.send({ error: e }).status(400);
  }
};

module.exports = {
  login,
  getCode,
};
