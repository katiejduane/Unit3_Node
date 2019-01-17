var express = require('express');
var router = express.Router();

const request = require('request');

const apiKey = require('../config.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Open Weather Map' });
});

router.post('/weather', (req, res)=> {
  let zipCode = req.body.zipCode;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=${apiKey}`
  request.get(weatherUrl, (error, response, body) => {
    const parsedData = JSON.parse(body);
    res.render('weather', {
      parsedData
    })
  })
});

module.exports = router;
