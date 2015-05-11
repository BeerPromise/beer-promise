// -- Server --
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));

// --- Database --
var mongojs = require('mongojs');
var db = mongojs((process.env.MONGOLAB_URI || 'beer-' + process.env.BEER_NODE_ENV), ['customers', 'bars', 'menus']);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({'extended':'true'}));

// -- Helper Files --
var bcrypt = require('./controllers/bcrypt');

// -- Server Start --
server.listen(port, function(){
  console.log("Listening on server port " + port);
});

app.get('/', function(req, res) {
  // This does NOT get called if there is an index.html...
  res.render('index')
});

module.exports = server;