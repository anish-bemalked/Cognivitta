const axios = require("axios");
const DBhandler = require("../DBhandler/DBhandler");

class holding {
  constructor(
    instrument_token,
    tradingsymbol,
    quantity,
    average_price,
    t1_quantity,
    label
  ) {
    this.instrument_token = instrument_token;
    this.tradingsymbol = tradingsymbol;
    this.quantity = quantity;
    this.average_price = average_price;
    this.t1_quantity = t1_quantity;
    this.label = label;
  }
}

const updateDatabase = async (holdings) => {
  let data = [];

  for (const obj of holdings) {
    try {
      const {
        instrument_token,
        tradingsymbol,
        quantity,
        average_price,
        t1_quantity,
      } = obj;

      let instrument_tokenExists = await DBhandler.getHoldingsByIsin(
        instrument_token
      );
      let label;

      if (instrument_tokenExists) {
        label = await DBhandler.getLabel(instrument_token);
        updatedData = new holding(
          instrument_token,
          tradingsymbol,
          quantity,
          average_price,
          t1_quantity,
          label
        );
        data.push(updatedData);

        const DBquantity = await DBhandler.checkQuantity(instrument_token);
        if (
          DBquantity.quantity !== quantity &&
          DBquantity.average_price !== average_price
        ) {
          await DBhandler.updateQuantity(obj);
        }
      } else {
        label = "All";
        updatedData = new holding(
          instrument_token,
          tradingsymbol,
          quantity,
          average_price,
          t1_quantity,
          label
        );
        data.push(updatedData);
        await DBhandler.addHolding(updatedData);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return data;
};

const getHoldings = async (req, res) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://api.upstox.com/v2/portfolio/long-term-holdings",
    headers: {
      Accept: "application/json",
    },
  };
  config.headers["Authorization"] = `Bearer ${req.body.token}`;

  const response = await axios(config);

  const updatedHoldings = await updateDatabase(response.data.data);
  res.send(updatedHoldings);
};

module.exports = {
  getHoldings,
};
