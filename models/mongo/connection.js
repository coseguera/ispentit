var db;

exports.init = function(mongoose, connectionString) {
    mongoose.connect(connectionString);
    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
};
exports.open = function(callback) {
    db.once('open', callback);
};
exports.close = function() {
    db.close();
};
