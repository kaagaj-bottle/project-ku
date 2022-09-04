const actionLogsRouter = require("express").Router();
const ActionLog = require("../models/actionLog");

actionLogsRouter.get("/", async (request, response) => {
  const actionLogs = await ActionLog.find({});
  response.json(actionLogs);
});

module.exports = actionLogsRouter;
