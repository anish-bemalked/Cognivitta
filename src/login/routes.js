const { Router } = require('express');
const controller = require('./controller');
const data = require('../applicationData/applicationData');

const router = Router();

router.get('/login',controller.login);
router.get('/code',controller.getCode);


module.exports = router;