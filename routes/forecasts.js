var express = require('express');
var router = express.Router();
var moment = require('moment');
var ForecastIo = require('forecastio');
var forecastIo = new ForecastIo('d8ab77870812de67277ae47d3e9bf83e');

var last30Dates = [];
var forecasts = [];


function getLast30Dates(callback) {
	for (var i = 0; i <= 29; i++) {
		//taking unix time of each day in the last 30 days and storing it in the 'last30Dates' array
		last30Dates.push(Math.floor((moment().subtract(i, 'days')) / 1000));
		console.log("we have all data");
	}

	callback();
}


router.get('/past-days/', function(req, res) {
	getLast30Dates( function(){
		for (var i = 0; i <= 29; i++) {
			forecastIo.forecast(req.query.lat, req.query.lng, last30Dates[i]).then(function(data) {
				forecasts.push(data)
			});

			if (i >= 29) {
				res.json(forecasts);
			}
		}
	});
});

router.get('/', function(req, res) {
	getLast30Dates();
	forecastIo.forecast(req.query.lat, req.query.lng).then(function(data) {
		res.json(data);
	});
});


module.exports = router;
