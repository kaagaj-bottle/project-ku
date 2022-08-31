const noticesRouter = require("express").Router();
const Notice = require("../models/notice");

noticesRouter.get("/", async (request, response) => {
  const notices = await Notice.find({});
  response.json(notices);
});

noticesRouter.post("/", async (request, response) => {
  const { title, pdfLink } = request.body;
  console.log(request.body);
  const notice = new Notice({
    title: title,
    pdfLink: pdfLink,
    date: new Date(),
  });

  const savedNotice = await notice.save();
  response.status(201).json(savedNotice);
});

module.exports = noticesRouter;
