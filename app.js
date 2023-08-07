const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorLogger = require("./util/errorLogs");

const userRoute = require("./routes/userRoute");
const incomeRoute = require("./routes/incomeRoute");
const dateRoute = require("./routes/dateRoute");

const URI =
  "mongodb+srv://acgpraveen:acgpraveen@love.gyuyiqt.mongodb.net/love?retryWrites=true&w=majority";

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/user", userRoute);
app.use("/income", incomeRoute);
app.use("/date", dateRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  errorLogger(err);
  res
    .status(statusCode)
    .json({
      message: "Something went wrong at the server side..!!",
      status: -1,
    });
});

mongoose
  .connect(URI)
  .then((succ) => {
    console.log("Connected to Mongodb Database");
    app.listen(8080);
  })
  .catch((err) => console.log(err));
