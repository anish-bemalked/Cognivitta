const data = require('../userData/userData')

const login = (req,res)=>{
    res.redirect(`https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=${data.apiKey}&redirect_uri=${data.redirectUrl}`);
};

module.exports = {
    login
}