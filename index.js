const express = require("express");
const bodyparser = require("body-parser");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
require("dotenv").config();

const postRoute = require("./Routes/PostRoute");
const getRoute = require("./Routes/GetRoute");

const PORT = process.env.PORT || 8080;
const app = express();


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(bodyparser.json());
app.use(cookieParser())
app.use(getRoute, postRoute);

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(PORT);
    console.log("App running on port: " + PORT);
  })
  .catch((err) => {
    console.log(err);
  });
