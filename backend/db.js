require('dotenv').config()
const mongoose = require("mongoose")
module.exports = (connectionString) => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    try {
        mongoose.connect(connectionString, connectionParams)
        console.log("Połączono z bazą danych")
    } catch (error) {
        console.log(error);
        console.log("Problem z połączeniem do bazy!")
    }
}