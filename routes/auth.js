// import modules
const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = app => {
	app.post("/signup", (req, res) => {
		// this route will handle signing up users

		console.log("This is password before", req.body.password);
		// encrypt password set salt to 10
		bcrypt.hash(req.body.password, 10, (err, hash) => {
			console.log("This is password after", req.body.password);

			//error handlor
			if (err) {
				return res.status(500).json({
					error: err
				});
			} else {
				// create a new user object
				const user = new User({
					Account_id: new mongoose.Types.ObjectId(),
					userName: req.body.userName,
					password: hash
				});
				// save the user object then send jwt to client
				user
					.save()
					.then(result => {
						const JWTToken = jwt.sign({
							_id: result.Account_id
						},
							process.env.SECRET, {
								expiresIn: "2h"
							}
						);
						console.log("user account created", result);
						return res.json(JWTToken).status(200);
						// error handlor
					})
					.catch(error => {
						console.log("User signup error:", error);
						res.status(500).json({
							error: err
						});
					});
			}
		});
	});

	app.post("/login", (req, res) => {
		// search mongo db to see of user exist
		User.findOne({
			userName: req.body.userName
		})
			.exec()
			.then(user => {
				//compare the password the user enter and the password stored in the db

				bcrypt.compare(req.body.password, user.password, (err, result) => {
					// error handler
					if (err) {
						return res.status(401).json({
							failed: "Unauthorized Acess"
						});
					}
					// if result is true create ans send jwt
					if (result) {
						let token = jwt.sign({
							id: user.Account_Id
						},
							process.env.SECRET, {
								expiresIn: "60 days"
							}
						);
						res.status(200).json(token);
					}
				});
			}) // error handler
			.catch(error => {
				res.status(500).json({
					error: "server side error"
				});
			});
	});
};
