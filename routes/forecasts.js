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


// Get the dates of the last 30 days by taking the advantage of Moment.js library.
// After the date is received convert it into a Unix format and store in the
// 'last30Dates' array
function getAllDates(cb) {
	for (var i = 0; i <= 20; i++) {
		last30Dates.push(Math.floor((moment().subtract(i, 'days')) / 1000));
	}
	cb();
}

function getAllForecasts(lat, lng, cb) {

	// Loop trough the last30Dates array and call for the forecasts
	// for every value i.e. every date in the last 30 days. Push the data
	// to the forecasts array of objects which will be sent to the client
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

// Get todat's forecasts
router.get('/', function(req, res) {
	forecast.fetch(req.query.lat, req.query.lng)
		.then(function(data) {
			res.json(data);
		})
		.catch(function(error) {
			console.error(error);
		});
});

// Get last 30 days forecasts
router.get('/past-days/', function(req, res) {
	getAllDates( function() {
		getAllForecasts(req.query.lat, req.query.lng, function() {
			res.json(forecasts);

			//reset the data after it's been sent
			forecasts = [];
			last30Dates = [];
		})
	})
});

module.exports = router;
