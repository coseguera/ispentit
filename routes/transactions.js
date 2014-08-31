'use strict';

exports.setup = function (router) {
    router.get('/', function (req, res) {
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

    return router;
};
