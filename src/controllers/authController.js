const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { jwtSecret, jwtExpiresIn } = require("../config");
const users = require("../data/users");

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Email and password are required",
    });
  }

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Invalid email or password",
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });

  return res.status(StatusCodes.OK).json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
}

module.exports = { login };
