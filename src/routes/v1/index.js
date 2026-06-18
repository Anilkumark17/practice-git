const express = require("express");
const authRouter = require("./auth");
const { authenticate } = require("../../middleware/auth");

const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ message: "API v1 is working!" });
});

router.use("/auth", authRouter);

router.get("/me", authenticate, (req, res) => {
  return res.json({ user: req.user });
});

router.use("/auth", authRouter);

module.exports = router;