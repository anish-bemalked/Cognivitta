const table = "holdings";

const getHoldings = `SELECT * FROM ${table}`;
const getHoldingsByIsin = `SELECT * FROM ${table} WHERE instrument_token = $1`;
const addHolding = `INSERT INTO ${table} (instrument_token, tradingsymbol,quantity,average_price,t1_quantity,label) VALUES ($1,$2,$3,$4,$5,$6)`;
const removeHolding = `DELETE FROM ${table} WHERE instrument_token = $1`;
const updateQuantity = `UPDATE ${table} SET quantity = $2,average_price = $3,t1_quantity = $4 WHERE instrument_token = $1`;
const updatelabel = `UPDATE ${table} SET label = $2 WHERE instrument_token = $1`;
const getlabel = `SELECT label FROM ${table} where instrument_token = $1`;
const addHoldingWithoutLabel = `INSERT INTO ${table} (instrument_token, tradingsymbol,quantity,average_price,t1_quantity) VALUES ($1,$2,$3,$4,$5)`;

module.exports = {
  getHoldings,
  getHoldingsByIsin,
  addHolding,
  removeHolding,
  updateQuantity,
  updatelabel,
  getlabel,
  addHoldingWithoutLabel,
};
