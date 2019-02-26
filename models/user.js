
// import modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// created new user models
UserSchema = new Schema({

	// give user an account ID
	accountID: mongoose.Schema.ObjectId,

	//timestamp when user signups
	creation: {
		type: Date,
		default: Date.now
	},

	// require user provide username
	username: {
		type: String,
		unique: true,
		required: true
	},

	//require user give passwords
	password: {
		type: String,
		required: true
	}

})

// exports model
module.exports = mongoose.model("User", UserSchema);
