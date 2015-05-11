// -- Server --
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
var root = __dirname + '/public/';
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// --- Database --
var mongojs = require('mongojs');
var db = mongojs('todolist', ['todolist']);

// -- Server Start --
server.listen(port, function(){
  console.log("Listening on server port " + port);
});
