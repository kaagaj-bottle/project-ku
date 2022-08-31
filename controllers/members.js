const bcrypt = require("bcrypt");
const membersRouter = require("express").Router();
const Member = require("../models/member");

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

module.exports = membersRouter;
