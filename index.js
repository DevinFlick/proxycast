var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var server = express();
var $http = require('axios');
var logger = require('./logger');

var port = process.env.PORT || 8080;
var apiKey = require('./config').apiKey;
var baseURL = 'https://api.forecast.io/forecast/';

//plugins middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(cors());
server.use(logger);
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
        .catch(function(error){
          console.log(error);
          response.status(500).send({error})
  });
});

server.get('/forecast/minutely/:lat,:lon', function(request, response){
  $http.get(baseURL + apiKey + '/' + request.params.lat+','+request.params.lon)
        .then(function(res){
          var responseObj = {
            latitude: res.data.latitude,
            longitude: res.data.longitude,
            minutely: res.data.minutely,
          };
          response.status(200).json(responseObj);
          console.log(responseObj);
        })
        .catch(function(error){
          console.log(error);
          response.status(500).send({error})
        });
});

// server.get('/forecast/daily/:lat,:lon', function(request, response){
//   $http.get(baseURL + apiKey + '/' + request.params.lat+','+request.params.lon)
//         .then(function(res){
//           var responseObj = {
//             latitude: res.data.latitude,
//             longitude: res.data.longitude,
//             daily: res.data.daily,
//           };
//           response.status(200).json(responseObj);
//           console.log(responseObj);
//         })
//         .catch(function(error){
//           console.log(error);
//           response.status(500).send({error})
//         });
// });

server.get('/forecast/daily/:lat,:lon', function (request, response){

  $http.get(baseURL + apiKey + '/' + request.params.lat + ',' + request.params.lon)
        .then(function(res){
          var overSummary = res.data.daily.summary;
          var overIcon = res.data.daily.icon;
          var dailyData = res.data.daily.data;
          var dailyArr = [];
          for(var i = 0; i < dailyData.length; i += 1){
            var o ={
            icon: dailyData[i].icon,
            tempMax: dailyData[i].temperatureMax,
            tempMin: dailyData[i].temperatureMin,
            humidity: dailyData[i].humidity,
            precipProb: dailyData[i].precipProbability
          };
          dailyArr.push(o);
        }
        var resObj = {
          latitude: res.data.latitude,
          longitude: res.data.longitude,
          summary: overSummary,
          icon: overIcon,
          daily: dailyArr
        };
        response.status(200).json(resObj);
        })
        .catch(function(err){
          response.status(500).json({
            msg:err
          });
        });
      });

//listen
server.listen(port, function(){
  console.log('Hey man! Now running on port...', port);
});
