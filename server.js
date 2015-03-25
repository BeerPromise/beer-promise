var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

var mongojs = require('mongojs');
var db = mongojs((process.env.MONGOLAB_URI || 'beer-development'), ['customers', 'bars', 'menus']);
var bodyParser = require('body-parser');

var createUser = require('./bcrypt');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({'extended':'true'}));

server.listen(port, function(){
  console.log("Listening on server port " + port);
});


app.get('/', function(req,res) {

  // if(!session.id) {redirect /login}

});

app.get('/login', function(req, res) {



});

app.post('/createcustomer', function(req, res){
  createUser(req.body.email, req.body.password, function(customer) {
    db.customers.insert(customer, function(err, docs) {
      if(err) {return console.error(err);}
    });
  });
  res.sendfile('public/test.html');
});

module.exports = server;
