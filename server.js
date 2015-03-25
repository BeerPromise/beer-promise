var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

var mongojs = require('mongojs');
var db = mongojs((process.env.MONGOLAB_URI || 'beer-development'), ['customers', 'bars', 'menus']);
var bodyParser = require('body-parser');

var bcrypt = require('bcrypt');

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
  var customer = {};

  customer.email = req.body.email;
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    console.log("!!!!"+hash);
    customer.password = hash;
    console.log(JSON.stringify(customer));

    db.customers.insert(customer, function(err, docs) {
      if(err) {return console.error(err);}
    });
  });


});

module.exports = server;
