const express = require("express");
const route = express.Router();
const is_Auth = require('../Authentication/Auth');

const getLogics = require("../Logics/GetRequest"); 

route.get("/newuser", getLogics.gettest);
route.get("/resetpassword/:token", getLogics.resetpass);

module.exports = route;
