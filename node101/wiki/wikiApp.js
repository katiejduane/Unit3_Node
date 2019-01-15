const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) => {
    if (req.url == '/') {
        console.log('someone wants to learn about parachuting!');
        res.writeHead(200, {'content-type': 'text/html'});
        const homePageHTML = fs.readFileSync('tinybroadwick.html');
        res.end(homePageHTML);
    } else if (req.url === '/wiki.css') {
        res.writeHead(200, {'content-type': 'text/css'});
        const homePageCSS = fs.readFileSync('wiki.css');
        res.end(homePageCSS);
    } else if (req.url === '/wiki.js') {
        res.writeHead(200, {'content-type': 'text/javascript'});
        const homePageJS = fs.readFileSync('wiki.js');
        res.end(homePageJS);
    } else if (req.url === '/private') {
        res.writeHead(403, {'content-type': 'text/html'});
        const offLimits = fs.readFileSync('katieseyesonly.html');
        res.end(offLimits);
    } else if (req.url === '/api') {
        res.writeHead(400, {'content-type': 'text/html'});
        const apiHTML = fs.readFileSync('api.html');
        res.end(apiHTML);
    } else {
        res.writeHead(404, {'content-type': 'text/html'});
        const notFound = fs.readFileSync('notfound.html')
        res.end(notFound)
    }
})


server.listen(3050)
