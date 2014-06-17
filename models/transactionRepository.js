var mongoose = require('mongoose'),
    db = require('./mongo/connection'),
    model = require('./mongo/transactionModel').Transaction(mongoose),
    crud = require('./mongo/transactionCRUD').crud(model);

exports.get = function(callback) {
    db.init(mongoose, 'mongodb://localhost/ispentit');
    db.open(function() {
        console.log('conn open');

        crud.get(function(err, items) {
            if(err) return console.error(err);
	    callback(items);
	    db.close();
        });
    });
};
