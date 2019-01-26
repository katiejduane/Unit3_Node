var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var config = require('../config')
var connection = mysql.createConnection(config);
connection.connect();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index')
});

router.post('/addMood', (req, res, next) => {
  const newMood = req.body.newMood;
  const newDate = req.body.newDate;
  const insertQuery = `INSERT INTO littleMermaid(mood, date)
    VALUES
    (?, ?);`
  connection.query(insertQuery, [newMood, newDate], (err, results) => {
    if (err) {
      throw err;
    } else {
      console.log(insertQuery)
      res.render('colors')
    }
  })
  // res.json(req.body)
})

router.post('/addColor', (req, res, next) => {
  const newMood = req.body.newMood;
  const newDate = req.body.newDate;
  const insertQuery = `INSERT INTO littleMermaid(color)
    VALUES
    (?);`
  connection.query(insertQuery, [newColor], (err, results) => {
    if (err) {
      throw err;
    } else {
      console.log(insertQuery)
      res.render('myAccount')
    }
  })
  // res.json(req.body)
})

module.exports = router;
