// require middleware packages
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

// define app, vital for using middleware!!
const app = express();

// use body parser to get req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use static folder structure
app.use(express.static(path.join(__dirname, 'static')));

// override when POST has ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));

// mount home route
app.get('/', (req, res) => {
	res.render('home.hbs');
});

// // require internal files
// const asset1 = require('./controllers/asset1.js');
// const asset2 = require('./controllers/asset2.js');

// // mount remaining routes
// app.use('/asset1', asset1);
// app.use('/asset2', asset2);