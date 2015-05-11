// -- Server --
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
var root = __dirname + '/public/';
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride());
app.set('view engine', 'ejs');

// --- Database --
var mongojs = require('mongojs');
var db = mongojs('todolist', ['todolist']);

// -- Server Start --
server.listen(port, function(){
  console.log("Listening on server port " + port);
});
