const mongoose      = require("mongoose");
const schema        = mongoose.Schema;

const userModel = new schema({
        name        : { type: String },
        token       : { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("sessions", userModel);