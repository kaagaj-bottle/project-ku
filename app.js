const config = require("./utilities/config");
const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utilities/middleware");
const logger = require("./utilities/logger");
const mongoose = require("mongoose");
require("express-async-errors");

const noticesRouter = require("./controllers/notices");
const imagesRouter = require("./controllers/images");
const membersRouter = require("./controllers/members");
const loginRouter = require("./controllers/login");
const actionLogsRouter = require("./controllers/actionLogs");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use(cors());
app.use("/api/notices", noticesRouter);
app.use("/api/images", imagesRouter);
app.use("/api/members", membersRouter);
app.use("/api/login", loginRouter);
app.use("/api/actionlogs", actionLogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
