var models = require('../../models/mongoModels');

exports.setup = function (router, helper, mongoose) {
    var Transaction = models.Transaction(mongoose);

    router.use(helper.logRequest);

    router.route('/')
        .get(function(req, res) {
            var query = req.query,
                find = Transaction.find(),
                fromDate = queryDate(find, query),
                result = {};

            find.sort({ date: 1, splitId: 1 })
            .exec(function(err, items) {
                if(err) return helper.logAndSend500(err, res);
    
                result.items = items;
    
                aggregateQuery(fromDate, '$account', function (err, accountSummaries) {
                    if(err) return helper.logAndSend500(err, res);
    
                    result.accountSummaries = accountSummaries;
    
                    if(query.by) result.by = query.by;
                    if(query.on) result.on = query.on;
    
                    aggregateQuery(fromDate, '$person', function (err, personSummaries) {
                        if(err) return helper.logAndSend500(err, res);
    
                        result.personSummaries = personSummaries;
    
                        res.json(result);
                    });
                });
            });
        });

    function queryDate(find, query) {
        var fromDate;
        
        if(query.from || query.to) {
            if(query.from) {
                fromDate = new Date(query.from);
                find.where('date').gt(fromDate);
            }

            if(query.to) find.where('date').lte(addDays(query.to, 1));
        } else {
            fromDate = addDays(null, -15);
            find.where('date').gt(fromDate);
        }
        return fromDate;
    }

    function queryBy(find, query) {
        if(query.by) find.where('person').equals(query.by);
    }

    function queryOn(find, query) {
        if(query.on) find.where('account').equals(query.on);
    }

    function addDays(dateStr, days) {
        var date = dateStr ? new Date(dateStr) : new Date();
        date.setDate(date.getDate() + days);
        return date;
    }

    function aggregateQuery (maxDate, field, callback) {
        Transaction.aggregate(
            { $match: { date: { $lte: maxDate } } },
            { $group: { _id: field, value: { $sum: '$amount' } } },
            callback);
    }

    return router;
};
