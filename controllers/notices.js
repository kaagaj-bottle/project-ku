const noticesRouter = require("express").Router();
const config = require("../utilities/config");
const Member = require("../models/member");
const Notice = require("../models/notice");
const jwt = require("jsonwebtoken");

const getToken = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  } else {
    return null;
  }
};

noticesRouter.get("/", async (request, response) => {
  const notices = await Notice.find({});
  response.json(notices);
});

noticesRouter.post("/", async (request, response) => {
  console.log("hello");
  const { title, pdfLink } = request.body;

  const token = getToken(request);
  console.log(token);
  const decodedToken = jwt.verify(token, config.SECRET_STRING);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const member = await Member.findById(decodedToken.id);

  const notice = new Notice({
    title: title,
    pdfLink: pdfLink,
    date: new Date(),
    postedBy: member.username,
  });

  const savedNotice = await notice.save();
  response.status(201).json(savedNotice);
});

module.exports = noticesRouter;
