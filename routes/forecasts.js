var express = require('express');
var router = express.Router();
var moment = require('moment');
var ForecastIo = require('forecastio');
var forecastIo = new ForecastIo('d8ab77870812de67277ae47d3e9bf83e');

var last30Dates = [];
var forecasts = [];


router.get('/', function(req, res) {
	forecastIo.forecast(req.query.lat, req.query.lng).then(function(data) {
		res.json(data);
	});
});


//function getAllDates(cb) {
//	for (var i = 1; i <= 3; i++) {
//		//taking unix time of each day in the last 30 days and storing it in the 'last30Dates' array
//		last30Dates.push(Math.floor((moment().subtract(i, 'days')) / 1000));
//	}
//	cb();
//}
//
//function getAllForecasts(lat, lng, cb) {
//	console.log(last30Dates);
//	for (var i = 0; i <= 2; i++) {
//		forecastIo.forecast(lat, lng, last30Dates[i]).then(function(data) {
//			forecasts.push(data)
//		});
//	}
//	cb();
//}

router.get('/past-days/', function(req, res) {
	forecastIo.forecast(req.query.lat, req.query.lng, req.query.date).then(function(data) {
		res.json(data);
	});
});


module.exports = router;
