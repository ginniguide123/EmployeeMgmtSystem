const userModel = require("../../modules/admin/services");
const dotenv    = require("dotenv");
const mongoose  = require("mongoose");
const process   = require("process");
const argv      = require("minimist")(process.argv);

dotenv.config({ path: "../../.env.local" });
const color = require("../lib/color-config"); //text color object
const { generateHashPassword } = require("../../utils/helper");

// input as CLI arguments
const { _, ...inputs }  = { ...argv };
const allowedKeys       = ["name", "email", "password", "role"];
let invalidKeys         = [];

// key validations
Object.keys(inputs).forEach((element) => {
    if (!allowedKeys.includes(element)) {
        invalidKeys.push(`'${element}'`);
    }
});

// error message
if (invalidKeys.length) {
    console.log(
        color["FgRed"],
        `Execution terminated!\n Invalid keys provided [${invalidKeys}]\n`
    );
    console.log(color["FgYellow"], `Info`);
    console.log(color["FgGreen"], `Alowed keys are [${allowedKeys}]\n`);
    console.log(color["Reset"]);
    process.exit(0);
}

// db connection
const initiateDBConnection = async () => {
    const config = {
        autoIndex           : true,
        useNewUrlParser     : true,
        useUnifiedTopology  : true,
    };
    const DBConnection = process.env.DATABASE;

    mongoose.connect(DBConnection, config);

    let db = mongoose.connection;

    db.on("error", function () {
        console.error.bind(console, "connection error:");
        mongoose.disconnect();
    });

    db.once("open", function () {
        console.log(color["FgBlue"], "\nDB Connection Successful!");
        console.log(color["Reset"]);
    });
};

// admin registration code
const createAdmin = async () => {
    try {
        const filter    = { email: inputs.email, role: inputs.role };
        const data      = await userModel.findOneUser(filter); //if admin exists

        if (data) throw new Error("Admin Already Exists");

        // const salt      = await bcrypt.genSalt(10);
        // const password  = await bcrypt.hash(inputs.password, salt);
        const password  = await generateHashPassword(inputs.password)
        const doc       = {
                            name        : inputs.name,
                            email       : inputs.email,
                            password    : password,
                            role        : inputs.role,
                        };
        const admin = await userModel.createUser(doc);

        if (admin) {
            console.log(color["FgBlue"], "default ADMIN created successfully!");
            console.log(color["Reset"]);
        }

        mongoose.disconnect();
    } catch (error) {
        console.log(color["FgRed"], "error at admin-reg - ", error);
        console.log(color["Reset"]);
        mongoose.disconnect();
    }
};

// initiating dbConnection
initiateDBConnection();

// registering ADMIN
createAdmin();
