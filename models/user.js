
// import modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// created new user models 
UserSchema = new Schema({

    // give user an account ID
    Account_Id: mongoose.Schema.ObjectId,

    //timestamp when user signups
    createdAt: {
        type: Date,
        default: Date.now
    },

    // require user provide username
    userName: {
        type: String,
        unique: true,
        required: true
    },

    //require user give password
    password: {
        type: String,
        required: true
    }

})

// exports model 
module.exports = mongoose.model("User", UserSchema);