exports.setup = function(app) {
    app.get('/', function (req, res) {
        res.render('index', {
            title: 'iSpentIt Home',
            message: 'Welcome to the site!',
            page: { home: true }});
    })
    .get('/about', function (req, res) {
        res.render('index', { 
            title: 'iSpentIt About', 
            message: 'About iSpentIt', 
            page: { about: true } });
    })
    .get('/transactions', function (req, res) {
        res.render('transactions', {
            title: 'iSpentIt Transactions',
            scripts: [
                '/lib/knockout/dist/knockout.js',
                '/lib/bootstrap-datepicker/js/bootstrap-datepicker.js',
                '/lib/sammy/lib/sammy.js',
                '/custom/js/transactions.js'
            ],
            styles: [
                '/lib/bootstrap-datepicker/css/datepicker3.css'
            ],
            page: { transactions: true }
        });
    });
};
