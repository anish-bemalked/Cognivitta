const axios = require('axios');
const userData = require('../applicationData/applicationData');

const login = (req,res)=>{
    res.redirect(`https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=${userData.apiKey}&redirect_uri=${userData.redirectUrl}`);
};

const getCode = async (req,res)=>{
    // const par = req.params
    const query = req.query
    
    const config = {
        method: 'post',
        url: 'https://api.upstox.com/v2/login/authorization/token',
        headers: { 
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data:{
            'client_id': userData.apiKey,
            'client_secret': userData.apiSecret,
            'redirect_uri': userData.redirectUrl,
            'grant_type': 'authorization_code',
        }
        
    }
    
    config.data['code']= query.code;

    // res.send(config);

    const response = await axios(config);
    userData.accessTocken = response.data.access_token;
    res.send(userData.accessTocken);
}

module.exports = {
    login,
    getCode,
}