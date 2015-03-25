var express = require('express');
var app = express();
var server = require('http').createServer(app);

var port = process.env.PORT || 3000;
var mongojs = require('mongojs');
var db = mongojs((process.env.MONGOLAB_URI || 'beer-development'), ['customers', 'bars', 'menus']);
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var createUser = require('./bcrypt');

var cookieParser = require('cookie-parser');

app.set('views', __dirname + '/public');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(cookieParser());
app.use(session({
  store: new MongoStore({db: 'beer-development'}),
  secret: "hashkey"
}));

server.listen(port, function(){
  console.log("Listening on server port " + port);
});

app.post('/createcustomer', function(req, res){
  createUser(req.body.email, req.body.password, function(customer) {
    db.customers.insert(customer, function(err, docs) {
      if(err) {return console.error(err);}
    });
  });
  session.test = "this is a test";
  console.log(session.test);
  res.sendfile('public/test.html');
});

app.get('/funk', function(req, res){
  res.send(session.test);
});

module.exports = server;
