require("dotenv").config();
const applicationData = require("./src/applicationData/applicationData");

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const axios = require("axios");

app.use(express.json());

const loginRoutes = require("./src/login/routes");
const userRoutes = require("./src/user/routes");
const holdingsRoutes = require("./src/holdings/routes");
const positionsRouter = require("./src/positions/routes");
const LTPRouter = require("./src/LTP/routes");
const logout = require("./src/logout/routes");

app.use("/v1", loginRoutes);
app.use("/v1/user", userRoutes);
app.use("/v1/holdings", holdingsRoutes);
app.use("/v1/positions", positionsRouter);
app.use("/v1/ltp", LTPRouter);
app.use("/v1/logout", logout);

app.listen(applicationData.port, () => {
  console.log(`Server is listening on ${applicationData.port}`);
});
