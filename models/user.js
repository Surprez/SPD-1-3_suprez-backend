// import modules
const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

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
	},

	// a user creates keywords once logged in
	keywords: [{
		type: String
	}]
})


UserSchema.plugin(validator)

// exports model
module.exports = mongoose.model('User', UserSchema)
