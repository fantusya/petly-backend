const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const usersRouter = require("./routes/api/users");
const newsRouter = require("./routes/api/news");
const friendsRouter = require("./routes/api/friends");
const petsRouter = require("./routes/api/pets");
const noticesRouter = require("./routes/api/notices");
const citiesRouter = require("./routes/api/cities");

dotenv.config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/news", newsRouter);
app.use("/api/friends", friendsRouter);
app.use("/api/pets", petsRouter);
app.use("/api/notices", noticesRouter);
app.use("/api/cities", citiesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
