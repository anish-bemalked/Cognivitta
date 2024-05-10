const { Router } = require("express");
const controller = require("./controller");
const data = require("../applicationData/applicationData");

const router = Router();

router.post("/profile", controller.getProfile);
router.post("/funds", controller.getFunds);

module.exports = router;
