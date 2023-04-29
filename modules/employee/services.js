const employeeModel     = require('./model');

module.exports = {

    createEmployee: async (data)=>{
        const dbResponse = await employeeModel.create(data);
        return dbResponse;
    },

    findEmployees: async (filter = {}, projection = {}) => {
        const dbResponse = await employeeModel.find(filter, projection);
        return dbResponse;
    },

    findOneEmployee: async (filter = {}, projection = {}) => {
        const dbResponse = await employeeModel.findOne(filter, projection);
        return dbResponse;
    }
}