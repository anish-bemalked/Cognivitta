require('dotenv').config()
const userData = require('./src/userData/userData')

console.log(userData);

const express =  require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const axios = require('axios');


const loginRoutes = require('./src/login/routes');
// const profileRoutes = require('./src/profile/routes');

app.use('/v1/login',loginRoutes);
// app.use('/v1/profil',profileRoutes);

app.get('/code',async (req,res)=>{
    const par = req.params
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

    const response = await axios(config);
    userData.accessTocken = response.data.access_token;
    res.send(userData.accessTocken);
})

app.listen(userData.port,()=>{
    console.log(`Server is listening on ${userData.port}`);
});