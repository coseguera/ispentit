exports.sendStatus = function(res, statusCode) {
    res.status(statusCode).send();
}

exports.logAndSend500 = function(err, res) {
    console.error(error);
    res.status(500).send();
}
    
exports.logRequest = function(req, res, next) {
    console.log(req.method + ' ' + req.originalUrl + ' ' + JSON.stringify(req.body));
    next();
}


