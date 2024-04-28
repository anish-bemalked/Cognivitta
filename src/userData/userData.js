const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;
const redirectUrl = process.env.REDIRECT_URL;
const port = process.env.PORT;
let accessTocken ='';

module.exports = {
    apiKey,
    apiSecret,
    redirectUrl,
    accessTocken,
    port,
}