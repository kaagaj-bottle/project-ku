const bcrypt = require("bcrypt");
const membersRouter = require("express").Router();
const Member = require("../models/member");
const config = require("../utilities/config");
const jwt = require("jsonwebtoken");
const getToken = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  } else {
    return null;
  }
};

membersRouter.get("/", async (request, response) => {
  const members = await Member.find({});
  response.json(members);
});

membersRouter.post("/", async (request, response) => {
  const { username, name, faculty, post, isRootMember, password } =
    request.body;

  const existingMember = await Member.findOne({ username });

  if (existingMember) {
    return response.status(400).json({
      error: "a member with the same username already exists",
    });
  }

  const saltRounds = 10;

  const passwordHash = await bcrypt.hash(password, saltRounds);

  const member = new Member({
    username,
    name,
    faculty,
    post,
    isRootMember,
    passwordHash,
  });

  const savedMember = await member.save();

  response.status(201).json(savedMember);
});

membersRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  const token = getToken(request);
  const decodedToken = jwt.verify(token, config.SECRET_STRING);

  if (!token || !decodedToken.id || !(decodedToken.id === id)) {
    return response.status(401).end();
  }

  try {
    await Member.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch {
    response.status(404).end();
  }
});

module.exports = membersRouter;
