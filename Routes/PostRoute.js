const express = require("express");
const route = express.Router();

const is_Auth = require("../Authentication/Auth");
const postLogics = require("../Logics/PostRequest");

route.post("/newuser", postLogics.newuser);
route.post("/login", postLogics.login);
route.post("/newBill", is_Auth, postLogics.addBill);
route.post("/pasreset", postLogics.resetpass);

module.exports = route;
