// This is an express app... maybe we should GET express!
const express = require('express');
// The code below actually MAKES an express app
let app = express();
// Put pur safety helmet on
const helmet = require('helmet');
// app.use means use some middleware
// middleware = any function that has access to req and res
app.use(helmet());

// Set up mySQL connection
const mysql = require('mysql');
const config = require('./config');
let connection = mysql.createConnection(config.db);
// we have a connection, le'ts connect!
connection.connect();

// add EJS so we can render!
app.set('views', 'views');
app.set('view engine', 'ejs')

// set up the public folder
app.use(express.static('public'))

app.get("/", (req, res, next) => {
    // res.send("sanity check");
    const animalQuery = "SELECT * FROM animals;";
    connection.query(animalQuery, (error, results) => {
        if (error) {
            throw error
        }
        // results is an array of all rows in animals
        // grab a random one
        const rand = Math.floor(Math.random() * results.length);
        res.render("index", { animal: results[rand] });
    })
})

// add a new route! the : is a wildcard because we don't know what the user will click on!
app.get('/vote/:value/:id', (req, res, next) => {
    const value = req.params.value;
    const id = req.params.id;
    const insertQuery = `INSERT INTO votes (id, aid, value)
        VALUES
        (DEFAULT, ?, ?);`;
    connection.query(insertQuery, [id, value], (error, results)=> {
        if(error) {throw error;}
        res.redirect('/')
    })
})

// SELECT column_name(s)
// FROM table1
// INNER JOIN table2 ON table1.column_name = table2.column_name;


app.get('/standings', function (req, res, next) {
    const selectQuery = `SELECT * FROM animals;`;
    connection.query(selectQuery, (error, results) => {
        res.render('index', { votesArray: results })
    })
});

console.log("App is listening on port 8282")
app.listen(8282)