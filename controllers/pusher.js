var secrets;
var Pusher = require('pusher');
try {
  secrets = require('./secrets');
} catch(e) {
  console.log('Local secrets not found, using Heroku');
  console.log('---- '+process.env.PUSHER_APP_ID);
  console.log('---- '+process.env.PUSHER_KEY);
  console.log('---- '+process.env.PUSHER_SECRET);
  secrets = {
    pusherAppId: process.env.PUSHER_APP_ID,
    pusherKey: process.env.PUSHER_KEY,
    pusherSecret: process.env.PUSHER_SECRET
  };
}

var pusher = new Pusher({
  appId: secrets.pusherAppId,
  key: secrets.pusherKey,
  secret: secrets.pusherSecret
});

module.exports = pusher;
