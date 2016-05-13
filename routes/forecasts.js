var express = require('express');
var router = express.Router();
var moment = require('moment');


var Forecast = require('forecast.io-bluebird');
var forecast = new Forecast({
	key: 'd8ab77870812de67277ae47d3e9bf83e',
	timeout: 10000
});

var last30Dates = [];
var forecasts = [];


router.get('/', function(req, res) {

	forecast.fetch(req.query.lat, req.query.lng)
		.then(function(data) {
			res.json(data);
		})
		.catch(function(error) {
			console.error(error);
		});
});


function getAllDates(cb) {
	for (var i = 0; i <= 30; i++) {
		//taking unix time of each day in the last 30 days and storing it in the 'last30Dates' array
		last30Dates.push(Math.floor((moment().subtract(i, 'days')) / 1000));
	}
	cb();
}

function getAllForecasts(lat, lng, cb) {

	last30Dates.forEach( function(entry) {
		forecast.fetch(lat, lng, entry)
			.then(function(data) {
				forecasts.push(data);
			})
			.catch(function(error) {
				console.error(error);
			});
	});

	cb();
}

router.get('/past-days/', function(req, res) {
	getAllDates( function() {
		getAllForecasts(req.query.lat, req.query.lng, function() {
			res.json(forecasts);
			forecasts = [];
			last30Dates = [];
		})
	})
});

module.exports = router;
