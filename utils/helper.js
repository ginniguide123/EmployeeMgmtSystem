//jwt verify and decode
const { sign, verify }  = require("jsonwebtoken");
const bcrypt            = require("bcryptjs");

module.exports = {

    createTokens: (user, time, _SECRET_KEY) => {
        const accessToken = sign(
            { email: user.email, userId: user._id, role: user.role },
            _SECRET_KEY,
            { expiresIn: time }
        );
        return accessToken;
    },

    verifyTokens: (tokens, _SECRET_KEY) => {
        const decoded = verify(tokens, _SECRET_KEY);
        return decoded;
    },

    generateHashPassword : async (stringValue) => {
        const salt              = await bcrypt.genSalt(10);
        const hashedPassword    = await bcrypt.hash(stringValue, salt);
        return hashedPassword;
    },

    comparePassword: async (string, hashString)=>{
        return await bcrypt.compare(string, hashString);
    }
};
