const http = require('http');
const fs = require('fs');
// (fs = file system)

const server = http.createServer((req, res)=>{
    if (req.url == '/') {
        console.log("Someone requested a page!!!", req.url)
        // res.end('<h1>whereami</h1>')
        res.writeHead(200, {'content-type': 'text/html' })
        const homePageHTML = fs.readFileSync('homepage.html')
        res.end(homePageHTML)
    } else if (req.url === '/scripts.js') {
        res.writeHead(200, {'content-type': 'text/javascript'})
        const scriptFile = fs.readFileSync('scripts.js')
        res.end(scriptFile)
    } else if (req.url === '/styles.css'){
        res.writeHead(200, {'content-type': 'text/css'})
        const styleFile = fs.readFileSync('styles.css')
        res.end(styleFile)
    } else if () {

    } else {
        res.writeHead(404, {'content-type': 'text/plain'})
        res.end("This page has been sucked into a blach hole.")
    }
}
)
// req = what the broswer is asking for
// res = the thing we use to talk back to the browser
// server.listen(3030)