exports.Transaction = function (mongoose) {
    var transactionSchema = mongoose.Schema({
        date: Date,
        concept: String,
        amount: Number,
        account: String,
        person: String,
        splitId: String
    });
    return mongoose.model('Transaction', transactionSchema);
};
