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
  const newColor = req.body.newColor;
  const newNote = req.body.newNote;
  console.log("hi", req.body)
  const insertQuery = `INSERT INTO littleMermaid(date, mood, color, note)
    VALUES
    (?, ?, ?, ?);`
  connection.query(insertQuery, [newDate, newMood, newColor, newNote], (err, results) => {
    if (err) {
      throw err;
    } else {
      console.log("hello", insertQuery)
      res.json(req.body)
      // res.render('myAccount')
    }
  })
})


module.exports = router;
