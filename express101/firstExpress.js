const express = require('express');
// console.log(express)
const app = express();

app.use(express.static('public'))

app.get('/', (req, res)=> {
    res.send("<h1>Hello, Bob</h1>");
})
app.listen(3000)

