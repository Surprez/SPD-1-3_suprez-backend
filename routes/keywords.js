// import modules
const User = require('../models/user.js');
const express = require('express');

// new express router
const router = new express.Router();

// set up routes
router.post('/keywords', async (req, res) => {
	User
		.findOneAndUpdate('')
		.then(() => {

		})
		.catch(() => {

		})

	// try {
	// 	const keyword = await User.create(req.body);
	// 	res.json(keyword)
	// } catch (err) {
	// 	res.status(400).json({
	// 		"error": err,
	// 		"status": 400
	// 	})
	// }
})

// export routes
module.exports = router;
