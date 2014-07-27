var models = require('../../models/mongoModels');

exports.setup = function (router, helper, mongoose) {
    var Person = models.Person(mongoose);

    router.use(helper.logRequest);

    router.route('/')
        .get(function(req, res) {
            Person.find(function(err, people) {
                if(err) return helper.logAndSend500(err, res);

                res.json(people);
            });
        })
        .post(function(req, res) {
            var person = new Person();
            person.id = req.body.id;
            person.name = req.body.name;

            if (!person.id || !person.name) return helper.sendStatus(res, 400);

            person.save(function(err) {
                if(err) return helper.logAndSend500(err, res);

                res.json({ msg: 'Person created' });
            });
        });

    router.route('/:id')
        .get(function(req, res) {
            Person.findOne({ id: req.params.id }, function(err, person) {
                if(err) return helper.logAndSend500(err, res);

                if(!person) return helper.sendStatus(res, 404);

                res.json(person);
            });
        })
        .put(function(req, res) {
            var id = req.params.id,
                name = req.body.name;

            if (!id || !name) return helper.sendStatus(res, 400);

            Person.findOne({ id: id }, function(err, person) {
                if(err) return helper.logAndSend500(err, res);

                if(!person) return helper.sendStatus(res, 404);

                person.name = name;

                person.save(function(err) {
                    if(err) return helper.logAndSend500(err, res);

                    res.json({ msg: 'Person updated' });
                });
            });
        })
        .delete(function(req, res) {
            var id = req.params.id;

            if(!id) return helper.sendStatus(res, 400);

            Person.findOneAndRemove({ id: id }, function(err, result) {
                if(err) return helper.logAndSend500(err, res);

                if(!result) return helper.sendStatus(res, 404);

                res.json({ msg: 'Person removed' });
            });
        });

    return router;
};
