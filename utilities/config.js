require("dotenv").config();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET_STRING = process.env.SECRET_STRING;

module.exports = {
  PORT,
  MONGODB_URI,
  SECRET_STRING,
};
