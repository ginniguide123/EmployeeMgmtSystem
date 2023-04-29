// jwt middleware
const { ErrorMessage } = require('../utils/commonMessages/message');
const { ErrorCode } = require('../utils/commonStatusCode/statusCode');
const catchAsync = require('../utils/errorHandlers/catchAsync');
const AppError = require('../utils/errorHandlers/errorHandler');
const { verifyTokens } =  require('../utils/helper');
//const log              = require('../scripts/log').child({ module : 'middleware/jwt' });

const authorize = catchAsync((req, res, next) => {
        const token = req.header('authorization');
        if (!token)
            throw new AppError(ErrorMessage.NO_AUTH_TOKEN,ErrorCode.BAD_REQUEST)

        const data = verifyTokens(token,process.env.ACCESS_JWT_KEY);
        req.user   = data;
        next();
});
module.exports = authorize;