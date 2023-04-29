const mongoose  = require('mongoose');
const dotenv    = require('dotenv');
let db          = mongoose.connection;
const logger    = require("../utils/logger/logger")

dotenv.config({ path: './.env.local' })

const DBConnection = process.env.DATABASE;

function init() {
    return new Promise((resolve, reject) => {
        mongoose.set('strictQuery', true);
        mongoose.connect(DBConnection,
            {
                autoIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });


        db.on('error', (err) => {
            logger.debug(`Connection with mongodb failed- ${err}`);
            return reject(err);
        });

        db.once('open', () => {
            logger.debug('Connection with mongodb successfully established.');
            return resolve();
        });

        db.on('disconnected', function () {
            logger.debug('Disconnected from mongodb');
        });

        db.on('connected', function () {
            logger.debug('Connection to mongodb ok');
        });
    });
}

module.exports = {
    init: init,
};