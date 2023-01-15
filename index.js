const express = require("express");
const conection = require("./config/db");
const { userRouter } = require("./router/User.router");
const { noteRouter } = require("./router/Note.router");
const { auth } = require("./middleware/auth.middleware");
require("dotenv").config();
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
// app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/users", userRouter);
app.use(auth);
app.use("/notes", noteRouter);

app.listen(process.env.port, async () => {
  try {
    await conection;
    console.log("Connected to db");
  } catch (err) {
    console.log(err);
  }

  console.log("server is listening on 3900");
});
