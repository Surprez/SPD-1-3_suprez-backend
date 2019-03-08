// import modules
const User = require('../models/user.js')
const express = require('express')

// new express router
const router = new express.Router()

// set up routes
router.get('/', (req, res) => { // GET KEYWORDS FORM IF LOGGED IN
	// check if logged in
	if (true) {
		res.redirect('keywords.html')
	} else {
		res.error('error')
	}
})

router.post('/', (req, res) => {
	console.log('keywords route post!')
	User
		.findOneAndUpdate('')
		.then(() => { })
		.catch((err) => {
			res.status(400).json({
				'error': err,
				'status': 400
			})
		})
})

// export routes
module.exports = router
