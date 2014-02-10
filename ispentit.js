var http = require('http');

http.createServer(function (req, resp) {
    console.log('request received');
    resp.writeHead(200, { 'content-type': 'text/plain' });
    resp.end('ispentit received your request');
}).listen(8000);

console.log('ispentit is ready');