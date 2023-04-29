const userModel     = require('./model');
const sessionModel  = require('./sessionModel');

module.exports = {

    createUser: async (data)=>{
        const dbResponse = await userModel.create(data);
        return dbResponse;
    },

    findUser: async (filter = {}, projection = {}) => {
        const dbResponse = await userModel.find(filter, projection);
        return dbResponse;
    },

    findOneUser: async (filter = {}, projection = {}) => {
        const dbResponse = await userModel.findOne(filter, projection);
        return dbResponse;
    },

    addRefreshToken: async (filter = {}, projection = {}) => {
        const dbResponse = await sessionModel.create(data);
        return dbResponse;
    }
}