var express = require('express'),
    hbs = require('hbs'),
    myauth = require('./models/auth'),
    indexRoutes = require('./routes/home');

// App options
var options = { port: 8000 };

// Create the express app
var app = express();

// accept *.html files as the type of files to use by handlebars
app.set('view engine', 'html');

// Set handlebars as the view engine
app.engine('html', hbs.__express);

// body parser for route matching
app.use(express.bodyParser());

// static folder
app.use(express.static('bower_components'));

// Authentication
var auth = express.basicAuth(function(user, pass, callback) {
	var result = myauth.validate(user, pass);
	callback(null, result);
});

// routes
indexRoutes.setup(app);

// listen
app.listen(options.port);

console.log('listening to port ' + options.port);
