var models = require('../../models/mongoModels');

exports.setup = function (app, mongoose) {
    var Transaction = models.Transaction(mongoose);
    app.get('/api/transactions', function (req, res) {
        Transaction.find(function(err, items) {
            if(err) return console.error(err);
            res.json(items);
        });
    });
};
