// require middleware packages
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
let cors = require('cors');
const path = require("path");


// define app, vital for using middleware!!
const app = express();

app.use(cors())
app.all('*', function (req, res, next) {
	var origin = req.get('origin');
	res.header('Access-Control-Allow-Origin', origin);
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

const cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
	originWhitelist: [], // Allow all origins
	requireHeader: ['origin', 'x-requested-with'],
	removeHeaders: ['cookie', 'cookie2']
})

// .listen(port, host, function () {
// 	console.log('Running CORS Anywhere on ' + host + ':' + port);
// });


// import auth



// require config items
require('dotenv').config();






// use body parser to get req.body
app.use(bodyParser.json());

app.use(bodyParser.json({
	type: ''
}));
app.use(bodyParser.urlencoded({
	extended: true
}));






// use static folder structure
app.use(express.static(path.join(__dirname, "static")));

// override when POST has ?_method=DELETE or ?_method=PUT
app.use(methodOverride("_method"));

// mount home route
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

// // require internal files
// const asset1 = require("./controllers/asset1.js");
// const asset2 = require("./controllers/asset2.js");
const auth = require("./routes/auth");

// // mount remaining routes
app.use('/', auth)
// app.use("/asset1", asset1);
// app.use("/asset2", asset2);

// process.env.PORT & MONGODB_URI lets the port and database be set by Heroku
// if they don"t exist, set them for local dev purposes
const port = process.env.PORT || 8080;
const url = process.env.MONGODB_URI || "mongodb://localhost/suprez";

app.listen(port, () => {
	console.log(`app listening on port http://localhost:${port}/`)
})

mongoose.Promise = global.Promise;
mongoose.connect(
	url, {
		useNewUrlParser: true
	},
	(err, db) => {
		console.log("app connected successfully to database");
	}
);

mongoose.set("useCreateIndex", true) // removes deprication warning
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));

module.exports = app