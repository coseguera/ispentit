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
exports.Person = function (mongoose) {
    var personSchema = mongoose.Schema({
        id: String,
        name: String
    });
    return mongoose.model('Person', personSchema);
};
exports.Account = function (mongoose) {
    var accountSchema = mongoose.Schema({
        id: String,
        name: String
    });
    return mongoose.model('Account', accountSchema);
};
