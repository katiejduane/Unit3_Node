// We need to read image files uploaded
const fs = require('fs')

// This is an express app... maybe we should GET express!
const express = require('express');
// The code below actually MAKES an express app
let app = express();

// get bcrypt!
const bcrypt = require('bcrypt-nodejs');

// get sessions
const expressSession = require('express-session');

// Put pur safety helmet on
const helmet = require('helmet');
// app.use means use some middleware
// middleware = any function that has access to req and res
app.use(helmet());

const multer = require('multer');
const upload = multer({dest: 'public/'});

// get config file
const config = require('./config');

const sessionOptions = {
    secret: config.sessionSecret,
    resave: false,
    saveUnitialized: true,
    // cookie: {secure: true}
};

// using sessions
app.use(expressSession(sessionOptions))

// Set up mySQL connection
const mysql = require('mysql');
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

// Define some middleware if the user is logged in, then send the user data over to the view
app.use('*', (req, res, next) => {
    // console.log('Middleware is working');
    if(req.session.loggedIn) {
        // res.locals is the variable that gets sent to the view
        res.locals.name = req.session.name
        res.locals.email = req.session.name
        res.locals.loggedIn = true;
    } else {
        res.locals.name = "";
        res.locals.email = "";
        res.locals.loggedIn = false;
    }
    next();
})

app.get("/", (req, res, next) => {
    // check to see if the user is logged in! if not, goodbye!
    if(!req.session.loggedIn) {
        res.redirect('/login?msg=mustLogIn')
    } else {
        // res.send("sanity check");
        // we want all rows in animals that don't have an id
        // in the votes table (this is to stop the user from voting
        // on the same photo more than once); we are working in two
        // different tables! it's a perfect case for a SUB-QUERY!
        // which is a query inside of a query!
        // we're going to get a list of all the votes this user has
        // and then check it against the list of animals
        const animalQuery = `SELECT * FROM animals WHERE animals.id NOT IN (
            SELECT aid FROM votes WHERE  uid = ?
        );`;
        connection.query(animalQuery, [req.session.uid],(error, results) => {
            if (error) {
                throw error
            }
            // see if there is anything in the query string for msg
            let msg;
            if (req.query.msg == 'regSuccess') {
                msg = "You're all signed up for this great site!";
                console.log(msg)
            } else if (req.query.msg == 'loginSuccess'){
                msg = "You're logged in."
            }

            // results is an array of all rows in animals
            // grab a random one
            if (results.length == 0) {
                // user has voted on all the animals
                res.render('index', {
                    animal: null,
                    msg: "You have voted on all the animals! Check out the standings."
                })
            } else {
                const rand = Math.floor(Math.random() * results.length);
                res.render("index", { 
                    animal: results[rand],
                    msg 
                });
            }
       });
    }
});

// add a new route! the : is a wildcard because we don't know what the user will click on!
app.get('/vote/:value/:id', (req, res, next) => {
    const value = req.params.value;
    const aid = req.params.id;
    const insertQuery = `INSERT INTO votes (id, aid, value, uid)
        VALUES
        (DEFAULT, ?, ?, ?);`;
    connection.query(insertQuery, [aid, value, req.session.uid], (error, results)=> {
        if(error) {throw error;}
        res.redirect('/')
    })
})

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
    let msg;
    if (req.query.msg == 'noUser'){
        msg = "This email is not registered."
    } else if (req.query.msg == 'badPass'){
        msg = "This password is invalid."
    }
    
    res.render('login', {
        msg
    });
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
                // 3. the user and the password are in the database, match!
                // note: every single http request (route) is a completely new request,
                // the server forgets who we are. Cookies and sessions can help with here.
                // --Cookies: Stores data in the broswer with a key in the server
                // EVERY SINGLE PAGE REQUEST the entire cookie is sent to the server
                // --Sessions: Data is stored on the server with a key(cookie) on the browser
                req.session.name = results[0].name;
                req.session.email = results[0].email;
                req.session.uid = results[0].id;
                req.session.loggedIn = true;
                res.redirect('/?msg=loginSuccess')
            }
            
        }
        
    })
})

app.get('/logout', (req, res, next) => {
    // delete all session variables for this user
    req.session.destroy();
    res.redirect('/login?msg=loggedOut')
})

app.get('/uploadAnimal', (req, res, next) => {
    res.render('upload', {});
})

// app.post('/formSubmit', (req, res, next) => {
//     upload
//     next();
// })
// the above code does the same thing as the line below, but requires setting one route
// with two separate blocks of code which can be cofusing

app.post('/formSubmit', upload.single('imageToUpload'), (req, res, next) => {
    // get the animal name from the form (req.body)
    // get the image from the form... ?
    // res.json(req.file);
    // the file is here in req.file, but it is in BINARY
    // --1. get the temp path / location of file
    const tempPath = req.file.path
    // --2. set up the new target path / where we want it (i.e. original name might be useful here)
    const targetPath = `public/${req.file.originalname}`
    // --3. we can't read binary, but fs can, so have fs read it!
    // --4. once binary is read, write it to target
    fs.readFile(tempPath, (error, fileContents) => {
        if(error){throw error};
        fs.writeFile(targetPath, fileContents, (error2) => {
            if(error2){throw error2};
             // --5. insert the same of the file into the db
             const insertQuery = `INSERT INTO animals (id, species, image)
                VALUES
             (DEFAULT, ?, ?)`;
             connection.query(insertQuery, [req.body.animalName, req.file.originalname], (dbError, dbResults) => {
                if(dbError){
                    throw dbError
                }else{
                    fs.unlink(tempPath)
                    res.redirect('/')
                }
             })
        })
    })

    // --6. send the file to /

})

console.log("App is listening on port 8282")
app.listen(8282) 

