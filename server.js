var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

server.listen(port, function(){
  console.log("Listening on server port "+ port);
});

app.get('/', function(request, response){
  response.send("Hello world");
});

module.exports = server;
