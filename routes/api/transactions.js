var url = require('url'),
    models = require('../../models/mongoModels');

exports.setup = function (app, mongoose) {
    var Transaction = models.Transaction(mongoose);
    app.get('/api/transactions', function (req, res) {
        var reqUrl = url.parse(req.url, true),
            query = reqUrl.query,
            find = Transaction.find();

        console.log(query);

        if(query.from) find.where('date').gt(new Date(query.from));
        if(query.to) find.where('date').lte(addDays(query.to, 1));
        if(query.by) find.where('person').equals(query.by);
        if(query.on) find.where('account').equals(query.on);

        find.sort({ date: 1, splitId: 1 })
        .exec(function(err, items) {
            if(err) return console.error(err);
            res.json(items);
        });
    });

    function addDays(dateStr, days) {
        var date = new Date(dateStr);
        date.setDate(date.getDate() + days);
        return date;
    }
};
