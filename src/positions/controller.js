const axios = require('axios');
const userData = require('../applicationData/applicationData');

const getPositions = async(req,res)=>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.upstox.com/v2/portfolio/short-term-positions',
        headers: { 
          'Accept': 'application/json'
        }
    };
    config.headers['Authorization'] = `Bearer ${userData.accessTocken}`;

    const response = await axios(config);
    res.send(response.data);
    
};

module.exports = {
    getPositions
};