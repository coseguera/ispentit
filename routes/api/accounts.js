var url = require('url'),
    models = require('../../models/mongoModels');

exports.setup = function (app, mongoose) {
    var Account = models.Account(mongoose);

    app.get('/api/accounts', function (req, res) {
        Account.find(function (err, accounts) {
            if(err) return console.error(err);

            res.json(accounts);
        });
    });
};
