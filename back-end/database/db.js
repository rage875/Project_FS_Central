// Require mongoose package for database schema
const Mongoose = require("mongoose");
let mongoose = null;

module.exports = function setupDB(config) {
    if(!mongoose) {
        mongoose = Mongoose.connect(
            `mongodb://${config.host}:${config.port}/${config.db}`,
            {useNewUrlParser: true});
    }

    return mongoose;
}