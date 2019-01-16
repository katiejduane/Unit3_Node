var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Trees in Georgia',
    species: [
      "Water Oak",
      "Dogwood",
      "River Birch",
      "Cabbage Palm"      
    ]
     });
});

module.exports = router;

router.get('/reverse', function (req, res, next) {
  res.render('reverse', {
    title: 'Trees in Georgia',
    species: [
      "Water Oak",
      "Dogwood",
      "River Birch",
      "Cabbage Palm"
    ]
  });
});
