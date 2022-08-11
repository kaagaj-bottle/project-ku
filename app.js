const config = require("./utilities/config");
const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utilities/middleware");

const noticesRouter = require("./controllers/notices");
const imagesRouter = require("./controllers/images");

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/notices", noticesRouter);
app.use("/api/images", imagesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
