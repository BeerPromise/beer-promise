var express = require('express');
var app = express();
var server = require('http').createServer(app);

var port = process.env.PORT || 3000;
var mongojs = require('mongojs');
var db = mongojs((process.env.MONGOLAB_URI || 'beerDevelopment'), ['customers', 'bars', 'menus']);
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var createUser = require('./bcrypt');

var cookieParser = require('cookie-parser');

app.set('views', __dirname + '/public');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.use(cookieParser());
app.use(session({
  store: new MongoStore({db: 'beer-development'}),
  secret: "hashkey",
  saveUninitialized: true,
  resave: true
}));

server.listen(port, function(){
  console.log("Listening on server port " + port);
});

app.get('/customer', function(req, res){
  res.sendfile('public/customer.html');   
});

app.get('/bar', function(req, res){
  res.sendfile('public/bar.html');   
});

app.get('/createcustomer', function(req, res){
  res.sendfile('public/customer.html'); 
});

app.post('/createcustomer', function(req, res){  
  createUser(req.body.email, req.body.password, function(customer) {
    db.customers.insert(customer, function(err, docs) {
      if(err) {return console.error(err);}
      res.json(docs);
    });
  });
});

app.get('/createcustomer', function(req, res){
  res.sendfile('public/customer.html'); 
});

module.exports = server;
