var mongoose = require('mongoose'),
    db = require('./mongo/connection'),
    model = require('./mongo/transactionModel').Transaction(mongoose),
    crud = require('./mongo/transactionCRUD').crud(model);

db.init(mongoose, 'mongodb://localhost/ispentit');
db.open(function() {
    console.log('conn open');

    crud.get(function(err, items) {
        if(err) return console.error(err);
	console.log(items);
	db.close();
    });
});
