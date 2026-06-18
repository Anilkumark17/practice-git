const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { jwtSecret, jwtExpiresIn } = require("../config");
const userService = require("../services/userService");

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Email and password are required",
    });
  }

  const user = await userService.findByEmail(email);
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

async function signup(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Name, email, and password are required",
    });
  }

  if (password.length < 6) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Password must be at least 6 characters",
    });
  }

  try {
    const user = await userService.createUser({ name, email, password });

    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: jwtExpiresIn,
    });

    return res.status(StatusCodes.CREATED).json({
      message: "Signup successful",
      token,
      user,
    });
  } catch (error) {
    const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

    return res.status(statusCode).json({
      message: error.message || "Something went wrong",
    });
  }
}

module.exports = { login, signup };
