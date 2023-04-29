const express       = require("express");
const routes        = express.Router();
const employee      = require("./controller");
// const authorize     = require("../middleware/auth");

routes.post("/onboarding",   employee.addEmployee);

module.exports = routes;