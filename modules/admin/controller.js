const catchAsync                                = require("../../utils/errorHandlers/catchAsync");
const appError                                  = require("../../utils/errorHandlers/errorHandler");
const { ErrorMessage, SuccessMessage }          = require("../../utils/commonMessages/message");
const { ErrorCode, SuccessCode }                = require("../../utils/commonStatusCode/statusCode");
const { commonResponse, sendResponseWithData }  = require("../../utils/commonResponses/responses");
const userServices                              = require("./services");
const { comparePassword, createTokens }         = require("../../utils/helper");
const statusEnum                                = require("../../utils/enum/statusEnum");
// const postMail                          = require("../../helpers/mailService/nodemailer");
// const logger                            = require("../../utils/logger/logger");

// const jwtAccessKeyExpiry = "60000"; //for a minute
const jwtAccessKeyExpiry = "1h";
// const jwtRefreshKeyExpiry = "1d";

module.exports = {

    userLogin : catchAsync( async function (req,res) {
        const {password,email} = req.body;
        const userDetails = await userServices.findOneUser({email : email});
        // if user not exists
        if(!userDetails)
            throw new appError(ErrorMessage.USER_NOT_EXISTS, ErrorCode.NOT_FOUND);
        // user password is wrong
        const passCheck = await comparePassword( password, userDetails.password );
        if(!passCheck)
            throw new appError(ErrorMessage.INVALID_CREDENTIALS, ErrorCode.INVALID_CREDENTIAL);
        // user status is not active
        if(userDetails.status !== statusEnum.ACTIVE)
            throw new appError(ErrorMessage.INACTIVE_USER, ErrorCode.NOT_ALLOWED);

        const userData = {
            name    : userDetails.name,
            email   : userDetails.email,
            role    : userDetails.role,
            status  : userDetails.status
        }

        const accessToken   = createTokens(userData, jwtAccessKeyExpiry, process.env.ACCESS_JWT_KEY);
        // const refreshToken  = createTokens(userData, jwtRefreshKeyExpiry, process.env.REFRESH_JWT_KEY);

        const tokens = {
            accessToken : accessToken,
            // refreshToken: refreshToken
        }
        sendResponseWithData(res,SuccessCode.SUCCESS,SuccessMessage.RECORD_FOUND,userData,tokens)
    }),

    addUser : catchAsync(async function (req, res) {
        const data = req.body;
        let response = await subServices.addUserSubscriber(data);

        if (response) {
            // logger.info('subscriber added!');
            return commonResponse(res, SuccessCode.SUCCESS, response, SuccessMessage.RECORD_CREATED)
        }

        throw new appError(ErrorMessage.RECORD_NOT_CREATED, ErrorCode.SOMETHING_WRONG);
    }),

    getUser: catchAsync(async function (req, res) {
        const filter = { mail : req.query.email}
        let response = await subServices.getSubscriber(filter);
        if (response)
            return commonResponse(res, SuccessCode.SUCCESS,  response, SuccessMessage.RECORD_FOUND)

        throw new appError(ErrorMessage.RECORD_NOT_FOUND, ErrorCode.NOT_FOUND);
    }),

}