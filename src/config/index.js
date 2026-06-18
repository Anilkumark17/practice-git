const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  port: process.env.PORT || 8080,
  jwtSecret: process.env.JWT_SECRET || "dev-secret-change-in-production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
};

