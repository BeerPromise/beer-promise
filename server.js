// --- Server ---
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var session = require('express-session');
var port = process.env.PORT || 3000;
var root = __dirname + '/public/';
app.use(express.static(__dirname + '/public'));
app.use(session({
  genid: function(req) {return genuuid();},
  secret: 'drink more beer'
}));

// --- Pusher ---
var pusher = require('./controllers/pusher');

// --- Database ---
var mongojs = require('mongojs');
var db = mongojs((process.env.MONGOLAB_URI || 'beer-'+process.env.BEER_NODE_ENV), ['customers', 'bars', 'menus']);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({'extended':'true'}));

// --- Helper Files ---
var bcrypt = require('./controllers/bcrypt');
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
  bcrypt.createUser(req.body.email, req.body.password, function(customer) {
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





app.post('/customerlogin', function(req, res) {
  var sess = req.session;

  console.log('About to process login');

  db.customers.findOne({email:req.body.email}, function(err, doc) {
    if(err) {console.log(err);}
    else if(doc){
      bcrypt.checkPassword(req.body.password, doc.password, function(isMatch) {
        if(isMatch) {
          console.log('It\'s a match!');
          sess.user = doc.email;
          res.redirect('/');
        }
        else {
          res.sendFile(root + 'login.html');
        }
      });
    }  // end else if(doc)
  });
});

app.get('/signout', function(req, res) {
  var sess = req.session;
  delete sess.user;
  res.redirect('/');
});


// -- JSON Requests
app.get('/get-session', function(req, res){
  var sess = req.session;
  res.json(sess.user);
});

  var testArray = [];

  app.get('/push-test', function(req, res) {
    testArray.push('FREE');
    pusher.trigger('test-channel', 'test-event', {"array": testArray});
  });



module.exports = server;
