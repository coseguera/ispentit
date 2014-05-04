exports.setup = function(app) {
    app.get('/', function (req, res) {
        res.render('index', { title: 'iSpentIt Home', message: 'Welcome to the site!' });
    })
    .get('/about', function (req, res) {
        res.render('index', { title: 'iSpentIt About', message: 'About iSpentIt' });
    });
};