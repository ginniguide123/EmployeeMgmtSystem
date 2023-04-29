const mongoose      = require("mongoose");
const schema        = mongoose.Schema;
const role          = require('../../utils/enum/roleEnum');
const statusEnum    = require('../../utils/enum/statusEnum');

const employeeModel = new schema({
        name        : { type: String, required: true },
        email       : { type: String, unique: true },
        mobile      : { type: String, unique: true },
        designation : { type: String, unique: true },
        age         : { type: Number },
        dob         : { type: String, unique: true },
        address     : { type: String, unique: true },
        salary      : { type: Number },
        role        : { type: String, enum : [role.EMPLOYEE] },
        status      : {
                        type    : String,
                        enum    : [statusEnum.ACTIVE, statusEnum.INACTIVE, statusEnum.BLOCK, statusEnum.DELETED],
                        default : statusEnum.ACTIVE
                    },
    },
    { timestamps: true }
);

module.exports = mongoose.model("employees", employeeModel);