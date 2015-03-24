var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
var mongojs = require('mongojs');
var db = mongojs((process.env.MONGOLAB_URI || 'beer-promise'), ['beer-promise']);
var bodyParser = require('body-parser');  // pull information from HTML POST (express4)

app.set('views', __dirname + '/public');
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

server.listen(port, function(){
  console.log("Listening on server port "+ port);
});

app.get('/', function(request, response){
  response.send("Hello world");
});

module.exports = server;
