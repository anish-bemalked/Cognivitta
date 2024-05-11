const pool = require("../../database");
const queries = require("./queries");

const getHoldings = () => {
  return new Promise((resolve, reject) => {
    pool.query(queries.getHoldings, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const getHoldingsByIsin = (instrument_token) => {
  return new Promise((resolve, reject) => {
    pool.query(
      queries.getHoldingsByIsin,
      [instrument_token],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.rows.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      }
    );
  });
};

const addHolding = (data) => {
  return new Promise((resolve, reject) => {
    const {
      instrument_token,
      tradingsymbol,
      quantity,
      average_price,
      t1_quantity,
      label,
    } = data;

    pool.query(
      queries.getHoldingsByIsin,
      [instrument_token],
      (error, results) => {
        if (error) {
          reject(error);
        } else if (results.rows.length) {
          reject("ISIN already exists");
        } else {
          pool.query(
            queries.addHolding,
            [
              instrument_token,
              tradingsymbol,
              quantity,
              average_price,
              t1_quantity,
              label,
            ],
            (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve("Updated row added successfully!");
              }
            }
          );
        }
      }
    );
  });
};

const removeHolding = (instrument_token) => {
  return new Promise((resolve, reject) => {
    pool.query(
      queries.getHoldingsByIsin,
      [instrument_token],
      (error, results) => {
        if (error) {
          reject("Internal Server Error");
        } else if (!results.rows.length) {
          reject("Holding not found in the database");
        } else {
          pool.query(
            queries.removeHolding,
            [instrument_token],
            (error, results) => {
              if (error) {
                reject("Internal Server Error");
              } else {
                resolve(instrument_token);
              }
            }
          );
        }
      }
    );
  });
};

const updateQuantity = (data) => {
  return new Promise((resolve, reject) => {
    const {
      instrument_token,
      tradingsymbol,
      quantity,
      average_price,
      t1_quantity,
      label,
    } = data;

    pool.query(
      queries.getHoldingsByIsin,
      [instrument_token],
      (error, results) => {
        if (error) {
          reject("Internal Server Error");
        } else if (!results.rows.length) {
          reject("Holding not found in the database");
        } else {
          pool.query(
            queries.updateQuantity,
            [instrument_token, quantity, average_price, t1_quantity],
            (error, results) => {
              if (error) {
                reject("Internal Server Error");
              } else {
                resolve(instrument_token);
              }
            }
          );
        }
      }
    );
  });
};

const updatelabel = (data) => {
  return new Promise((resolve, reject) => {
    const {
      instrument_token,
      tradingsymbol,
      quantity,
      average_price,
      t1_quantity,
      label,
    } = data;

    pool.query(
      queries.getHoldingsByIsin,
      [instrument_token],
      (error, results) => {
        if (error) {
          reject("Internal Server Error");
        } else if (!results.rows.length) {
          reject("Holding not found in the database");
        } else {
          pool.query(
            queries.updatelabel,
            [instrument_token, label],
            (error, results) => {
              if (error) {
                reject("Internal Server Error");
              } else {
                resolve(instrument_token);
              }
            }
          );
        }
      }
    );
  });
};

const checkQuantity = (instrument_token) => {
  return new Promise((resolve, reject) => {
    pool.query(
      queries.getHoldingsByIsin,
      [instrument_token],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      }
    );
  });
};

const getLabel = (instrument_token) => {
  return new Promise((resolve, reject) => {
    pool.query(
      queries.getHoldingsByIsin,
      [instrument_token],
      (error, results) => {
        if (error) {
          reject("Internal Server Error");
        } else if (!results.rows.length) {
          reject("Holding not found in the database");
        } else {
          pool.query(queries.getlabel, [instrument_token], (error, results) => {
            if (error) {
              reject("Internal Error");
            } else {
              resolve(results.rows[0].label);
            }
          });
        }
      }
    );
  });
};

module.exports = {
  getHoldings,
  getHoldingsByIsin,
  addHolding,
  removeHolding,
  updateQuantity,
  updatelabel,
  checkQuantity,
  getLabel,
};
