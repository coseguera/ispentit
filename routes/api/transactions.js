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
        })
        .post(function(req, res) {
            var t = new Transaction();
            t.date = req.body.date;
            t.concept = req.body.concept;
            t.amount = req.body.amount;
            t.person = req.body.person;
            t.account = req.body.account;
            
            var splitId = req.body.splitId;
            if(splitId) t.splitId = splitId;

            if(!t.date || !t.concept || !t.amount || !t.person || !t.account) 
                return helper.sendStatus(res, 400);

            t.amount = t.amount * 100;

            t.save(function(err) {
                if(err) return helper.logAndSend500(err, res);

                res.json({ msg: 'Transaction created' });
            });
        });

    router.route('/:id')
        .get(function(req, res) {
            var id = req.params.id;

            if(!id || !mongoose.Types.ObjectId.isValid(id))
                return helper.sendStatus(res, 400);
            
            Transaction.findById(id, function(err, transaction) {
                if(err) return helper.logAndSend500(err, res);

                if(!transaction) return helper.sendStatus(res, 404);

                res.json(transaction);
            });
        })
        .put(function(req, res) {
            var id = req.params.id,
                date = req.body.date,
                concept = req.body.concept,
                amount = req.body.amount,
                person = req.body.person,
                account = req.body.account;

            if(!id 
                || !mongoose.Types.ObjectId.isValid(id) 
                || !date 
                || !concept 
                || !amount 
                || !person 
                || !account) 
                return helper.sendStatus(res, 400);

            Transaction.findById(id, function(err, transaction) {
                if(err) return helper.logAndSend500(err, res);

                if(!transaction) return helper.sendStatus(res, 404);

                transaction.date = date;
                transaction.concept = concept;
                transaction.amount = amount;
                transaction.person = person;
                transaction.account = account;

                transaction.save(function(err) {
                    if(err) {
                        if(err.name === 'CastError') return helper.sendStatus(res, 400);

                        return helper.logAndSend500(err, res);
                    }

                    res.json({ msg: 'Transaction updated' });
                });
            });
        })
        .delete(function(req, res) {
            var id = req.params.id;

            if(!id || !mongoose.Types.ObjectId.isValid(id))
                return helper.sendStatus(res, 400);

            Transaction.findByIdAndRemove(id, function(err, result) {
                if(err) return helper.logAndSend500(err, res);

                if(!result) return helper.sendStatus(res, 404);

                res.json({ msg: 'Transaction removed' });
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
