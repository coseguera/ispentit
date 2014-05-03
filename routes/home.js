exports.setup = function(app) {
    app.get('/', function (req, res) {
        res.render('index', { title: 'iSpentIt Home' });
    })
    .get('/about', function (req, res) {
        res.render('index', { title: 'iSpentIt About' });
    });
};
