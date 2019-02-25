// require middleware packages
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import methodOverride from 'method-override';
// import path from 'path';

// define app, vital for using middleware!!
const app = express();
const router = express.Router();

// use body parser to get req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use static folder structure
app.use(express.static(path.join(__dirname, 'static')));

// override when POST has ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));

// mount bad routes
app.all('*', (request, response) => {
	console.log('Returning a 404 from the catch-all route');
	return response.sendStatus(404);
});

// mount home route
router.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

// // require internal files
// const asset1 = require('./controllers/asset1.js');
// const asset2 = require('./controllers/asset2.js');

// // mount remaining routes
// app.use('/asset1', asset1);
// app.use('/asset2', asset2);

// (process.env.PORT) & (MONGODB_URI) lets the port and database be set by Heroku
// if they don't exist, set them for local dev purposes
const port = process.env.PORT || 8080;
const url = process.env.MONGODB_URI || 'mongodb://localhost/suprez';

app.listen(port, () => {
	console.log(`app listening on port http://localhost:${port}/`)
})

mongoose.Promise = global.Promise;
mongoose.connect(
	url,
	{ useNewUrlParser: true },
	(err, db) => {
		console.log('app connected successfully to database');
	}
);

mongoose.set('useCreateIndex', true) // removes deprication warning
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));

module.exports = app;
