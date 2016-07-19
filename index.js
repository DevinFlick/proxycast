var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var server = express();
var $http = require('axios');

var port = process.env.PORT || 8080;
var apiKey = require('./config').apiKey;
var baseURL = 'https://api.forecast.io/forecast/';

//plugins middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(cors());

//test route
server.get('/forecast/hourly/:lat,:lon', function (request, response){
  $http.get(baseURL + apiKey + '/' + request.params.lat+','+request.params.lon)
        .then(function(res){
          var responseObj = {
            latitude: res.data.latitude,
            longitude: res.data.longitude,
            hourly: res.data.hourly,
          };
          response.status(200).json(responseObj);
        })
        .catch(function(err){
          console.log(err);
          response.status(500).send({'baddddddddd'})
  });
});

//listen
server.listen(port, function(){
  console.log('Hey man! Now running on port...', port);
});
