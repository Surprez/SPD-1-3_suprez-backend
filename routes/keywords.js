// import modules
const User = require('../models/user.js')
const express = require('express')

// new express router
const router = new express.Router()

router.get('/', (req, res) => { // GET KEYWORDS FORM IF LOGGED IN
	// check if logged in
	if (true) {
		res.redirect('keywords.html')
	} else {
		res.error('error')
	}
})

// set up routes
router.post('/', (req, res) => {
	User
		.findOneAndUpdate('')
		.then(() => {

		})
		.catch((err) => {
			res.status(400).json({
				'error': err,
				'status': 400
			})
		})

	// try {
	// 	const keyword = await User.create(req.body)
	// } catch (err) {
})

// export routes
module.exports = router
