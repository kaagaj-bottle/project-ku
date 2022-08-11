const config = require("./utilities/config");
const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utilities/middleware");
mongoose = require("mongoose");

// const noticeRouter = require("./controllers/notices");

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

module.exports = app;
