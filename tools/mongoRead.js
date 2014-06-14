var mongoose = require('mongoose'),
    tranModel = require('./../models/transaction');

mongoose.connect('mongodb://localhost/ispentit');
var Transaction = tranModel.Transaction;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('conn open');
    Transaction.find(function (err, items) {
	if(err) return console.error(err);

	console.log(items);
	db.close();
    });
});
