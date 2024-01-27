//SSE 1-5
var http = require('http');

http.createServer(function(req, res){
    console.log('Client connected');
    
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'cache-control': 'no-cache',
        'connection': 'keep-alive',
        'access-control-allow-origin': '*'
    });

    const interval = setInterval(function() {
        res.write(`data: ${randomInt(100,127)}\n\n`);
    }, 2000)

    res.on('close', () => {
        console.log('Client closed connection');
        clearInterval(interval);
        res.end();
    })
}).listen(3000);

console.log('SSE-Server started');

function randomInt(low, high) {
    return Math.floor(Math.random()* (high-low) +low);
}