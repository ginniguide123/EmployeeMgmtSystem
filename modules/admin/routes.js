const express = require("express");
const routes  = express.Router();
const user    = require("./controller");
// const authorize     = require("../middleware/auth");

routes.post("/login",   user.userLogin);

module.exports = routes;