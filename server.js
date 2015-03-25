var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

var mongojs = require('mongojs');
var db = mongojs((process.env.MONGOLAB_URI || 'beer-development'), ['customers', 'bars', 'menus']);
var bodyParser = require('body-parser');

var createUser = require('./bcrypt');



app.set('views', __dirname + '/public');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
//app.use(bodyParser.json());                                     // parse application/json
//app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

server.listen(port, function(){
  console.log("Listening on server port " + port);
});

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/createcustomer', function(req, res){

  console.log("Shits about to happen");
  createUser(req.body.email, req.body.password, function(customer) {
    db.customers.insert(customer, function(err, docs) {
      console.log("Checkpoint C!");
      if(err) {return console.error(err);}
    });
  });

});

module.exports = server;
