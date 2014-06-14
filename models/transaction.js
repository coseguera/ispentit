var mongoose = require('mongoose'),
    transactionSchema = mongoose.Schema({
	date: Date,
	concept: String,
	amount: Number,
	account: String,
	person: String,
	splitId: String
    });
exports.Transaction = mongoose.model('Transaction', transactionSchema);
