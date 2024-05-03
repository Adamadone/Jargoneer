const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const definitionController = require("./controller/definition");
const userController = require("./controller/user");
const commentController = require("./controller/comments");

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/definition", definitionController);
app.use("/user", userController);
app.use("/comment", commentController)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
