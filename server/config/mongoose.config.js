const mongoose = require("mongoose");

module.exports = (DB) => {
    mongoose.connect(`mongodb://127.0.0.1:27017/${DB}`)
        .then(() => {
            console.log(`Connected to the ${DB} database.`);
        })
        .catch(() => {
            console.log(`Cannont connect to the ${DB} database.`);
        })
}