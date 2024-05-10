require("dotenv").config();
const applicationData = require("./src/applicationData/applicationData");

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const axios = require("axios");

const loginRoutes = require("./src/login/routes");
const userRoutes = require("./src/user/routes");
const holdingsRoutes = require("./src/holdings/routes");
const positionsRouter = require("./src/positions/routes");

app.use("/v1", loginRoutes);
app.use("/v1/user", userRoutes);
app.use("/v1/holdings", holdingsRoutes);
app.use("/v1/positions", positionsRouter);

app.listen(applicationData.port, () => {
  console.log(`Server is listening on ${applicationData.port}`);
});
