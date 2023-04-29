const logger            = require("../logger/logger");
const { ErrorCode }     = require("../commonStatusCode/statusCode");
const { ErrorMessage }  = require("../commonMessages/message");

module.exports = (err, req, res, next) => {
    /// error class middleware
    const customErrors = {
        'jwt expired'   : { statusCode: ErrorCode.UNAUTHORIZED, message: ErrorMessage.TOKEN_EXPIRED },
        'jwt malformed' : { statusCode: ErrorCode.BAD_REQUEST, message: ErrorMessage.INVALID_TOKEN }
    }
    const statusCode = customErrors[err?.message]?.statusCode || err.statusCode || ErrorCode.INTERNAL_ERROR;
    const errMessage = customErrors[err?.message]?.message || err.message || ErrorMessage.INTERNAL_ERROR;

    // logging errors
    logger.error(`${statusCode} - ${err.message} - ${req.path} ${req.method}`);

    // error responses
    res.status(statusCode).json({
        success     : false,
        message     : errMessage,
        statusCode  : statusCode,
        reference   : `${req.path} ${req.method}`,
        stack       : err.stack,
    });
};
