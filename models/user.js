const mongoose = require("mongoose");
const Schema = mongoose.Schema;


UserSchema = new Schema({

    Account_Id: mongoose.Schema.ObjectId,

    createdAt: {
        type: Date,
        default: Date.now
    },

    userName: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("User", UserSchema);