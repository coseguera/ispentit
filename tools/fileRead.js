'use strict';

var fs = require('fs'),
    mongoose = require('mongoose'),
    uuid = require('uuid-lib'), // ToDo: install node-uuid
    path = __dirname + '/expenses.txt';

fs.readFile(path, 'utf8', function(err, data) {
	if(err) { console.log(err); }

	var result = data.split('\n'),
	    splitIds = {};

	mongoose.connect('mongodb://localhost/ispentit');

	var transactionSchema = mongoose.Schema({
		date: Date,
		concept: String,
		amount: Number,
		account: String,
		person: String,
		splitId: String
	});
	var Transaction = mongoose.model('Transaction', transactionSchema);

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function () {
		console.log('conn open');

		for(var i = 0, len = result.length; i < len; i++) {
			if (!result[i]) { continue; }

			var item = JSON.parse(result[i]);
			if(item.splitId) {
				if(splitIds[item.splitId]) {
					item.splitId = splitIds[item.splitId];	
				} else {
					item.splitId = splitIds[item.splitId] = uuid.raw();
				}

			}
		
			var dbItem = new Transaction(item);

			dbItem.save(onErrorSave);
		}

        function onErrorSave (err) {
            if(err) { return console.error(err); }
        }

		Transaction.find(function (err, items) {
			if(err) { return console.error(err); }

			console.log(items);
		});
	});
});
