const mongoose = require("mongoose")

const userDataSchema = new mongoose.Schema({

    userId:String,
    points:Number

})

const userDataModel = mongoose.model("users", userDataSchema)

module.exports = userDataModel;