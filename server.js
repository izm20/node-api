const express = require("express");
const app = express();
const movieRouter = require("./src/api/movies");

app.use(express.json());

app.get("/", (req, res) => {
  res.json({name: "api-node"})
});

app.use("/movies", movieRouter);

app.listen(3000, () => {
  console.log("Listen on port 3000");
});
