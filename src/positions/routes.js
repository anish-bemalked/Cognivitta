const { Router } = require("express");
const controller = require("./controller");
const data = require("../applicationData/applicationData");

const router = Router();

router.post("/", controller.getPositions);

module.exports = router;
