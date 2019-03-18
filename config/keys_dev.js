// UNCOMMENT FOR LOCAL DEVELOPMENT
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY,
  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET
};
