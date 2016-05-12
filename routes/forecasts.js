var express = require('express');
var router = express.Router();
var request = require("request");

/* GET users listing. */
router.get('/', function(req, res) {
  //Lets configure and request
  request({
    url: 'https://api.forecast.io/forecast/d8ab77870812de67277ae47d3e9bf83e/'+ req.query.lat + req.query.lng,
    method: 'GET',
    headers: {
      'Content-Type': 'MyContentType',
      'Custom-Header': 'Custom Value'
    }
  }, function(error, response, body){
    if(error) {
      console.log(error);
    } else {
      console.log(response.statusCode, body);
      res.send(req.query.lat + ' , ' + req.query.lng);
    }
  });
})


module.exports = router;
