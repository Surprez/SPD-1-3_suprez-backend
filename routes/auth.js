// import modules
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');

// new express router
const router = new express.Router();

// set up routes
router.get('/signup', (req, res) => { // GET SIGN UP FORM
	res.redirect('signup.html');
});

router.get('/login', (req, res) => { // GET LOG IN FORM
	res.redirect('login.html');
});

router.post('/signup', (req, res) => { // USER SIGNUP

	// encrypt password & add salting to 10
	bcrypt.hash(req.body.password, 10, (error, hash) => {

		// error handling block
		if (error) {
			console.log('server error:\n', error);
			return res.status(500).json({ error: error.message });
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
					console.log(MyUser)
					const JWTToken = jwt.sign(
						{ _id: MyUser.accountID },
						process.env.SECRET,
						{ expiresIn: '2h' }
					);
					console.log('user account created:\n', MyUser);
					return res.status(200).json({ JWTToken });
				})

				// final error catcher
				.catch((error) => {
					console.log('user signup error:\n', error);
					return res.status(500).json({ error: error.message });
				});
		}
	});
});

router.post('/login', (req, res) => {

	// search db for user, if they exist
	User.findOne({ username: req.body.username })
		.exec()
		.then((MyUser) => {

			// compare input password to password stored in db
			bcrypt.compare(req.body.password, MyUser.password, (error, result) => {

				// error handling block
				// if result is true create ans send jwt
				if (result && !error) {
					let token = jwt.sign(
						{ id: MyUser.accountID },
						process.env.SECRET,
						{ expiresIn: '60d' }
					);
					console.log('successful login:\n', token);
					return res.status(200).json({ token });
				} else {
					console.log('unauthorized access:\n', error);
					return res.status(401).json({ error: error.message });
				}
			});
		})

		// final error catcher
		.catch((error) => {
			console.log('server error:\n', error);
			return res.status(500).json({ error: error.message });
		});
});

// export routes
module.exports = router;
