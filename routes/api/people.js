var url = require('url'),
    models = require('../../models/mongoModels');

exports.setup = function (app, mongoose) {
    var Person = models.Person(mongoose);

    app.get('/api/people', function (req, res) {
        Person.find(function (err, people) {
            if(err) return console.error(err);

            res.json(people);
        });
    });
};
