var secrets;
try {
  secrets = require('./secrets');
} catch(e) {
  console.log('Local secrets not found, using Heroku');
  secrets = {
    pusherAppId: process.env.PUSHER_APP_ID,
    pusherKey: process.env.PUSHER_KEY,
    pusherSecret: process.env.PUSHER_SECRET
  };
}

var pusher = new require('pusher')({
  appId: secrets.pusherAppId,
  key: secrets.pusherKey,
  secret: secrets.pusherSecret
});

module.exports = pusher;