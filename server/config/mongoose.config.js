const mongoose = require("mongoose");

module.exports = (DB) => {
    mongoose.connect(`mongodb://localhost/${DB}`)
        .then(() => {
            console.log(`Connected to the ${DB} database.`);
        })
        .catch(() => {
            console.log(`Cannont connect to the ${DB} database.`);
        })
}