var express = require('express'),
    hbs = require('hbs'),
    myauth = require('./models/auth'),
    indexRoutes = require('./routes/home'),
    apiTransactions = require('./routes/api/transactions');

// App options
var options = { port: 8000 };

var app = express(); // Create the express app
app.set('view engine', 'html'); // accept *.html files as the type of files to use by handlebars
app.engine('html', hbs.__express); // Set handlebars as the view engine
app.use(express.bodyParser()); // body parser for route matching
app.use(express.static('bower_components')); // static folder

// Authentication
var auth = express.basicAuth(function(user, pass, callback) {
	callback(null, myauth.validate(user, pass));
});

// routes
indexRoutes.setup(app);

// api routes
apiTransactions.setup(app);

// listen
app.listen(options.port);
console.log('listening to port ' + options.port);
