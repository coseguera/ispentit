var express = require('express');
var hbs = require('hbs');

// App options
var options = {
    port: 8000
};

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

// routes and listen
app
    .get('/', function (req, res) {
        res.render('index', { title: 'ISpentIt home' });
    })
    .get('/wack/:id', function (req, res) {
        var id = req.params.id;
        res.render('identifier', { title: 'Identifier', myId: id });
    })
    .listen(options.port);


console.log('listening to port ' + options.port);
