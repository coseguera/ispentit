var repository = require('../../models/transactionRepository');

exports.setup = function (app) {
    app.get('/api/transactions', function (req, res) {
        repository.get(function(items) {
            res.json(items);
        });
    });
};
