var moment = require('moment');
var ForecastIo = require('forecastio');
var forecastIo = new ForecastIo('d8ab77870812de67277ae47d3e9bf83e');

var last30Dates = [];
var forecasts = [];


exports.getAll= function(lat, lng, cb) {
	getAllDates( function () {
		for (var i = 0; i <= 2; i++) {
			forecastIo.forecast(lat, lng, last30Dates[i]).then(function(data) {
				forecasts.push(data);
				cb(data);
				console.log(data);
			});
		}
	});
};
