// This is an express app... maybe we should GET express!
const express = require('express');
// The code below actually MAKES an express app
let app = express();

// get bcrypt!
const bcrypt = require('bcrypt-nodejs');

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

// we need the body parser and urlencode middleware so we can get data from POST requests
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res, next) => {
    // res.send("sanity check");
    const animalQuery = "SELECT * FROM animals;";
    connection.query(animalQuery, (error, results) => {
        if (error) {
            throw error
        }
        // see if there is anything in the query string for msg
        let msg;
        if (req.query.msg == 'regSuccess') {
            msg = "You're all signed up for this great site!";
            console.log(msg)
        }

        // results is an array of all rows in animals
        // grab a random one
        const rand = Math.floor(Math.random() * results.length);
        res.render("index", { 
            animal: results[rand],
            msg 
        });
    })
})

// add a new route! the : is a wildcard because we don't know what the user will click on!
app.get('/vote/:value/:id', (req, res, next) => {
    const value = req.params.value;
    const aid = req.params.id;
    const insertQuery = `INSERT INTO votes (id, aid, value)
        VALUES
        (DEFAULT, ?, ?);`;
    connection.query(insertQuery, [aid, value], (error, results)=> {
        if(error) {throw error;}
        res.redirect('/')
    })
})

// SELECT Orders.OrderID, Customers.CustomerName
// FROM Orders
// INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;

app.get('/standings', (req, res, next) => {
    const selectQuery = 
    `SELECT SUM(IF(value = 'tame', 1, -1)) AS tameCount, MAX(animals.species) as species FROM votes
    INNER JOIN animals ON votes.aid = animals.id
    GROUP BY animals.species;`;
    // const giveMeALLTheData = 
    //     `SELECT * FROM votes
    //     INNER JOIN animals on votes.aid = animals.id;`;
    connection.query(selectQuery, (error, results) => {
        if (error) {throw error}
        res.render('standings', {results});
    })
});

app.get('/register', (req, res) => {
    let msg;
    if(req.query.msg == 'register'){
        msg = 'This email address is already registered.'
    }
    res.render('register', {
        msg
    })
})

app.post('/registerProcess', (req, res, next) => {
    const hashedPass = bcrypt.hashSync(req.body.password);
    // res.json(hashedPass);
    // before we insert a new user in the DB, we have to make sure they didn't already register!
    const checkUserQuery = `SELECT * FROM users WHERE email = ?`;
    connection.query(checkUserQuery, [req.body.email], (error, results) => {
        if(error) {throw error;}
        if(results.length != 0){
            res.redirect('/register?msg=register')
        } else {
            // this is a new user, insertthem!
            const insertQuery = `INSERT INTO users (name, email, hash)
            VALUES
            (?,?,?)`;
            connection.query(insertQuery, [req.body.name, req.body.email, hashedPass],(error2, results2) => {
                if (error2) {throw error2}
                res.redirect('/?msg=regSuccess')
            })
        }
    })
})

app.get('/login', (req, res, next) => {
    res.render('login', {});
});

app.post('/loginProcess', (req, res, next) => {
    // res.json(req.body)
    const email = req.body.email;
    // this is the english version of the password the user submitted
    const password = req.body.password;
    // we now need to get the hashed version from the db and compare!
    const checkPasswordQuery = `SELECT * FROM users WHERE email = ?`;
    connection.query(checkPasswordQuery, [email], (error, results) => {
        if (error) {throw error}
        // possibilities:
        // 1. the user is not in the database (no match)
        if (results.length == 0) {
            res.redirect('/login?msg=noUser');
        }else{
            // User exists...
            // 2. the user is IN the database but the password doesn't match
            const passwordsMatch = bcrypt.compareSync(password, results[0].hash);
            if(!passwordsMatch) {
                //goodbye
                res.redirect('/login?msg=badPass')
            }else{
                // 3. the user and the password are in te database, match!
                res.redirect('/?msg=loginSuccess')
            }
            
        }
        
    })
})

console.log("App is listening on port 8282")
app.listen(8282) 

