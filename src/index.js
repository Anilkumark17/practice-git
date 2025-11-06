const express = require("express");
const { port } = require("./config");

const app = express();
const apiRouter = require("./routes");

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
