exports.setup = function (app) {
	app.get('/transactions', function (req, res) {
		res.render('transactionList', { title: 'Transactions', page: { transactions: true });
	});
};
