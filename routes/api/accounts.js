var models = require('../../models/mongoModels');

exports.setup = function (router, helper, mongoose) {
    var Account = models.Account(mongoose);

    router.use(helper.logRequest);

    router.route('/')
        .get(function(req, res) {
            Account.find(function(err, accounts) {
                if(err) return helper.logAndSend500(err, res);

                res.json(accounts);
            });
        })
        .post(function(req, res) {
            var account = new Account();
            account.id = req.body.id;
            account.name = req.body.name;

            if (!account.id || !account.name) return helper.sendStatus(res, 400);

            account.save(function(err) {
                if(err) return helper.logAndSend500(err, res);

                res.json({ msg: 'Account created' });
            });
        });

    router.route('/:id')
        .get(function(req, res) {
            Account.findOne({ id: req.params.id }, function(err, account) {
                if(err) return helper.logAndSend500(err, res);

                if(!account) return helper.sendStatus(res, 404);

                res.json(account);
            });
        })
        .put(function(req, res) {
            var id = req.params.id,
                name = req.body.name;

            if (!id || !name) return helper.sendStatus(res, 400);

            Account.findOne({ id: id }, function(err, account) {
                if(err) return helper.logAndSend500(err, res);

                if(!account) return helper.sendStatus(res, 404);

                account.name = name;

                account.save(function(err) {
                    if(err) return helper.logAndSend500(err, res);

                    res.json({ msg: 'Account updated' });
                });
            });
        })
        .delete(function(req, res) {
            var id = req.params.id;

            if(!id) return helper.sendStatus(res, 400);

            Account.findOneAndRemove({ id: id }, function(err, result) {
                if(err) return helper.logAndSend500(err, res);

                if(!result) return helper.sendStatus(res, 404);

                res.json({ msg: 'Account removed' });
            });
        });

    return router;
};
