var express = require('express');
var router = express.Router();

var ForecastIo = require('forecastio');
var forecastIo = new ForecastIo('d8ab77870812de67277ae47d3e9bf83e');


router.get('/', function(req, res) {
	forecastIo.forecast(req.query.lat, req.query.lng).then(function(data) {
		res.json(data);
	});
});


router.get('/past-days/', function(req, res) {
	forecastIo.forecast(req.query.lat, req.query.lng, req.query.date).then(function(data) {
		res.json(data);
	});
});

/* GET users listing. */
//router.get('/', function(req, res) {
//  //Lets configure and request
//  request({
//    url: 'https://api.forecast.io/forecast/' + api + req.query.lat + ',' + req.query.lng,
//    method: 'GET',
//    headers: {
//      'Content-Type': 'application/json'
//    }
//
//  }, function(error, response, body){
//    if(error) {
//      console.log(error);
//    } else {
//      console.log(response.statusCode, body);
//      res.json(JSON.parse(body));
//    }
//  });
//});
//
//router.get('/past-days/', function(req, res) {
//  //Lets configure and request
//  request({
//    url: 'https://api.forecast.io/forecast/'+ api + req.query.lat + ',' + req.query.lng + ',' + req.query.date
//  }, function(error, response, body){
//    if(error) {
//      console.log(error);
//    } else {
//      console.log(response.statusCode, body);
//      res.json(JSON.parse(body));
//    }
//  });
//});

module.exports = router;
