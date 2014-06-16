exports.crud = function(Transaction) {
    return {
        get: function(callback) {
            Transaction.find(callback);
        }
    };
};
