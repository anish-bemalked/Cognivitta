const axios = require('axios');
const userData = require('../applicationData/applicationData');

const getHoldings = async(req,res)=>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.upstox.com/v2/portfolio/long-term-holdings',
        headers: { 
          'Accept': 'application/json'
        }
    };
    config.headers['Authorization'] = `Bearer ${userData.accessTocken}`;

    const response = await axios(config);
    res.send(response.data);
};

module.exports = {
    getHoldings
};