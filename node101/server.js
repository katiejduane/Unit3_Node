const http = require('http');
// we don't need to install http because it's native to Node
// console.log(http);

// createServer takes 1 argument: a callback function to run when someone makes an 
// HTTP connection to this program

const server = http.createServer((req, res)=>{
    console.log("Someone hit our HTTP server");
    res.end("<h1>Calamity Jane</h1>");
});

server.listen(3000)