const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

const mongoose = require("mongoose");
const connect = require("./schemas/index.js");
connect(); // mongoDB에 연결

const indexRouter = require("./routes/index");



// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors({
  origin: true,
  credentials: true
}));

app.use("/api", indexrouter);

app.get("/", (req, res) => {
  res.status(200).json({ message :"메인화면" })
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

app.listen(8000, () => {
  console.log(8000, "포트로 서버가 열렸어요!");
});
