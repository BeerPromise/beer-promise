var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
var mongojs = require('mongojs');
var db = mongojs((process.env.MONGOLAB_URI || 'beerDevelopment'), ['beerDevelopment']);
var bodyParser = require('body-parser');  // pull information from HTML POST (express4)

app.set('views', __dirname + '/public');
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users                                       // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

server.listen(port, function(){
  console.log("Listening on server port " + port);
});

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/createcustomer', function(req, res){
  db.beerDevelopment.insert(req.body, function(err, docs){
    res.json(docs);
  });  
});

module.exports = server;
