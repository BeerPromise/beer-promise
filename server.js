// --- Server ---
var express = require('express');
var app = express();
var router = express.Router();
var server = require('http').createServer(app);
var session = require('express-session');
var port = process.env.PORT || 3000;
var root = __dirname + '/public/';
app.use(express.static(__dirname + '/public'));
app.use(session({
  genid: function(req) {return genuuid();},
  secret: 'drink more beer'
}));

// --- Database ---
var mongojs = require('mongojs');
var db = mongojs((process.env.MONGOLAB_URI || 'beer-development'), ['customers', 'bars', 'menus']);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({'extended':'true'}));

// --- Helper Files ---
var createUser = require('./controllers/bcrypt');
var genuuid = require('./controllers/uuid');


// --- Server Start ---
server.listen(port, function(){
  console.log("Listening on server port " + port);
});

// -- Remember these methods --
// var sess = req.session
// res.redirect('');
// res.send('');

app.get('/', function(req, res) {
  // This does NOT get called if there is an index.html...
  var sess = req.session;
  if (sess.user) {
    res.sendFile(root + 'menuApp.html');
  }
  else {
    res.sendFile(root + 'login.html');
  }

});

app.post('/createcustomer', function(req, res){
  var sess = req.session;
  createUser(req.body.email, req.body.password, function(customer) {
    db.customers.insert(customer, function(err, docs) {
      if(err) {return console.error(err);}
      console.log('Stored User');
    });
  });

  // -- I think ideally we'd use the customers object id
  // -- in the session. However to do so gonna have to
  // -- figure out async and promise chains, so just using
  // -- email for now, which should be unique. But they're
  // -- not because we're not validating input yet.

  sess.user = req.body.email;
  res.redirect('/');
});


  // -- TODO:
  // Set up bcrypt compare to log a user in.

app.post('/customerlogin', function(req, res) {
  var sess = req.session;

  db.customers.findOne({email:req.body.email}, function(err, doc) {
    if(err) {console.log(err); return;}
    else if(doc){
    console.log(doc.password);
    }
  });

  res.send(req.body.email);

});

module.exports = server;
