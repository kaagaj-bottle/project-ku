const noticesRouter = require("express").Router();
const config = require("../utilities/config");
const Member = require("../models/member");
const Notice = require("../models/notice");
const ActionLog = require("../models/actionLog");
const jwt = require("jsonwebtoken");
const logger = require("../utilities/logger");
const commonFuncs = require("../utilities/commonFuncs");

noticesRouter.get("/", async (request, response) => {
  const notices = await Notice.find({});
  response.json(notices);
});

noticesRouter.get("/:id", async (request, response) => {
  try {
    const notice = await Notice.findById(request.params.id);
    response.json(notice);
  } catch {
    response.status(404).end();
  }
});

noticesRouter.post("/", async (request, response) => {
  const { title, pdfLink } = request.body;

  const token = commonFuncs.getToken(request);

  const decodedToken = jwt.verify(token, config.SECRET_STRING);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  if (!title || !pdfLink) {
    return response.status(401).json({ error: "input field missing" });
  }

  const member = await Member.findById(decodedToken.id);

  const notice = new Notice({
    title: title,
    pdfLink: pdfLink,
    date: new Date(),
    postedBy: member.username,
  });

  const savedNotice = await notice.save();
  const noticeLog = new ActionLog(
    logger.setNoticeActionString(savedNotice, "post", member.username)
  );
  await noticeLog.save();
  response.status(201).json(savedNotice);
});

noticesRouter.delete("/:id", async (request, response) => {
  const token = commonFuncs.getToken(request);
  const id = request.params.id;
  const decodedToken = jwt.verify(token, config.SECRET_STRING);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  try {
    const noticeToBeRemoved = await Notice.findById(request.params.id);
    const noticeLog = new ActionLog(
      logger.setNoticeActionString(
        noticeToBeRemoved,
        "deletion",
        decodedToken.username
      )
    );
    await noticeLog.save();

    await Notice.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch {
    response.status(404).end();
  }
});

module.exports = noticesRouter;
