var express = require('express'),
    bodyParser = require('body-parser'),
    hbs = require('hbs'),
    mongoose = require('mongoose'),
    routerHelper = require('./helpers/routerHelper'),
    myauth = require('./models/auth'),
    indexRoutes = require('./routes/home'),
    transactionsRoutes = require('./routes/transactions'),
    apiTransactions = require('./routes/api/transactions'),
    apiPeople = require('./routes/api/people'),
    apiAccounts = require('./routes/api/accounts');

// App options
var options = { port: 8000 };

var app = express(); // Create the express app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'html'); // accept *.html files as the type of files to use by handlebars
app.engine('html', hbs.__express); // Set handlebars as the view engine
app.use('/lib', express.static('bower_components')); // bower folder
app.use('/custom', express.static('statics')); // statics folder

// db
mongoose.connect('mongodb://localhost/ispentit');

//// Authentication
//var auth = express.basicAuth(function(user, pass, callback) {
//    callback(null, myauth.validate(user, pass));
//});

//// routes
app.use('/', indexRoutes.setup(express.Router()));
app.use('/transactions', transactionsRoutes.setup(express.Router()));

// api routes
app.use('/api/accounts', apiAccounts.setup(express.Router(), routerHelper, mongoose));
app.use('/api/people', apiPeople.setup(express.Router(), routerHelper, mongoose));
app.use('/api/transactions', apiTransactions.setup(express.Router(), routerHelper, mongoose));

// listen
app.listen(options.port);
console.log('listening to port ' + options.port);
