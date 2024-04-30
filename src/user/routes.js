const { Router } = require('express');
const controller = require('./controller');
const data = require('../applicationData/applicationData');

const router = Router();

router.get('/profile',controller.getProfile);
router.get('/funds',controller.getFunds);

module.exports = router;
