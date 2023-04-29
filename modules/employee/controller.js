const catchAsync                                = require("../../utils/errorHandlers/catchAsync");
const appError                                  = require("../../utils/errorHandlers/errorHandler");
const { ErrorMessage, SuccessMessage }          = require("../../utils/commonMessages/message");
const { ErrorCode, SuccessCode }                = require("../../utils/commonStatusCode/statusCode");
const { commonResponse, sendResponseWithData }  = require("../../utils/commonResponses/responses");
// const employeeServices                          = require("./services");
// const statusEnum                                = require("../../helpers/enum/statusEnum");
// const logger                            = require("../../utils/logger/logger");

module.exports = {

    addEmployee : catchAsync(async function (req, res) {
        // const data = req.body;
        // let response = await subServices.addUserSubscriber(data);

        // if (response) {
        //     // logger.info('subscriber added!');
        //     return commonResponse(res, SuccessCode.SUCCESS, response, SuccessMessage.RECORD_CREATED)
        // }

        // throw new appError(ErrorMessage.RECORD_NOT_CREATED, ErrorCode.SOMETHING_WRONG);
    }),

    getEmployee: catchAsync(async function (req, res) {
        // const filter = { mail : req.query.email}
        // let response = await subServices.getSubscriber(filter);
        // if (response)
        //     return commonResponse(res, SuccessCode.SUCCESS,  response, SuccessMessage.RECORD_FOUND)

        // throw new appError(ErrorMessage.RECORD_NOT_FOUND, ErrorCode.NOT_FOUND);
    }),

}