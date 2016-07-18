var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var server = express();

var port = process.env.PORT || 8080;

//plugins middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(cors());

//test route
server.get('/', function (request, response){
  response.send('hello you beautiful son of a bitch!');
  });

//listen
server.listen(port, function(){
  console.log('Hey man! Now running on port...', port);
});
