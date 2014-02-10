var http = require('http');

http.createServer(function (req, resp) {
    console.log('request received');
    response.writeHead(200, { 'content-type': 'text/plain' });
    response.end('ispentit received your request');
}).listen(8000);

console.log('ispentit is ready');