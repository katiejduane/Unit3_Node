var express = require('express');
var router = express.Router();

//our node module for the key, in gitignore
const apiKey = require('../config.js');
const apiBaseUrl = 'http://api.themoviedb.org/3';
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const request = require('request');


/* GET home page. */
router.get('/', function(req, res, next) {
  request.get(nowPlayingUrl, (error, response, body)=> {
    const parsedData = JSON.parse(body)
    // res.json(parsedData)
    // we now have the data from movie API; lets send it over to the view/ejs!
    res.render('now_playing', {
      parsedData: parsedData.results,
      imageBaseUrl
      // parsedData: parsedData (same as above, but in ES6 if the key and value are the same, you can just send the name)
    })
  })
// res.render('index', { title: 'Express' });
});

router.get('/search', (req, res, next) =>{
  res.render('search', {
    title: 'Search for a movie'
  })
});

router.post('/search/movie', (req, res, next)=> {
  //submitted data from forms comes in the req object
  //querystring data is in req.query
  //posted data is in req.body
  const movieTitle = req.body.movieTitle;
  const searchUrl = `${apiBaseUrl}/search/movie?query=${movieTitle}&api_key=${apiKey}`
  request.get(searchUrl, (error, response, body)=>{
    const parsedData = JSON.parse(body);
    res.render('now_playing', {
      imageBaseUrl,
      parsedData: parsedData.results
    })
  })
});

module.exports = router;
