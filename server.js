// NPM libraries
const express           = require("express");
const cors              = require("cors");
const dotenv            = require("dotenv");
const app               = express();

// server functions
const routes            = require("./routes/routes")
const logger            = require("./utils/logger/logger");
const AppError          = require("./utils/errorHandlers/errorHandler");
const errorController   = require("./utils/errorHandlers/errorController");
const apiLogger         = require("./utils/logger/apiRouteLogger");
// const DBConnection      = require("./database/dbConnection");
const {ErrorCode}       = require("./utils/commonStatusCode/statusCode")

//environment variables
dotenv.config({ path: "./.env.local" });

app.use(express.json());
app.use(cors({ origin: "*" }));

// creating DB Connection
// DBConnection.init();

// routes
app.use("/api", apiLogger, routes);

// server check api
app.get("/server-check",(req,res)=>res.send("Hi Server is running!"));


app.all("*", (req, res, next) => {
    throw new AppError(`Requested URL http://localhost:${process.env.PORT}${req.path} not found!`, ErrorCode.NOT_FOUND );
});

app.use(errorController);

app.listen(process.env.PORT, () => {
  logger.debug(`listening on *:${process.env.PORT}`);
});