// import modules
const User = require("../models/user");
const express = require('express');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// new express router
const router = new express.Router();

// set up routes
router.get('/signup', (req, res) => { // GET SIGN UP FORM
	res.redirect("signup.html");
});

router.get('/login', (req, res) => { // GET LOG IN FORM
	res.redirect("login.html");
});

router.post("/signup", (req, res) => { // USER SIGNUP

	// encrypt password set salt to 10
	bcrypt.hash(req.body.password, 10, (error, hash) => {

		// error handling block
		if (error) {
			return res.status(500).json({ error });
		} else {

			// create a new user object
			const NewUser = new User({
				accountID: new mongoose.Types.ObjectId(),
				username: req.body.username,
				password: hash
			});

			// save the user object then send jwt to client
			NewUser
				.save()
				.then((MyUser) => {
					const JWTToken = jwt.sign(
						{ _id: MyUser.accountID },
						{ expiresIn: "2h" },
						process.env.SECRET
					);
					console.log("user account created:\n", MyUser);
					return res.json(JWTToken).status(200);
				})

				// final error catcher
				.catch(error => {
					console.log("user signup error:\n", error);
					return res.status(500).json({ error });
				});
		}
	});
});

router.post("/login", (req, res) => {
	// search mongo db to see of user exist
	User.findOne({
		username: req.body.username
	})
		.exec()
		.then((MyUser) => {
			// compare input password to password stored in db
			bcrypt.compare(req.body.password, MyUser.password, (err, result) => {

				// error handling block
				if (error) {
					console.log("unauthorized access:\n", error);
					return res.status(401).json({ error });
				}

				// if result is true create ans send jwt
				if (result) {
					let token = jwt.sign(
						{ id: MyUser.accountID },
						{ expiresIn: "60d" },
						process.env.SECRET
					);
					console.log("successful login:\n", token);
					return res.status(200).json({ token });
				}
			});
		})

		// final error catcher
		.catch(error => {
			console.log("server error:\n", error);
			return res.status(500).json({ error });
		});
});

// export routes
module.exports = router;
