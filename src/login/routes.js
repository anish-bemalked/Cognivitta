const { Router } = require('express');
const controller = require('./controller');
const data = require('../userData/userData');

const router = Router();

router.get('/',controller.login);


module.exports = router;