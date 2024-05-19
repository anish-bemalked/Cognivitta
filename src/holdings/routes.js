const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.post("/", controller.getHoldings);
router.post("/editLabel", controller.editLabel);

module.exports = router;
