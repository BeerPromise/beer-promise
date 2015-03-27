var Pusher = require('pusher');
var secrets;
var pusher;


try {
  secrets = require('./secrets');
} catch(e) {
  console.log('Local secrets not found, using Heroku');
  pusher = Pusher.forURL(process.env.PUSHER_URL);
  console.log('!!!!! '+process.env.PUSHER_URL);
}

if (secrets) {
  var pusher = new Pusher({
    appId: secrets.pusherAppId,
    key: secrets.pusherKey,
    secret: secrets.pusherSecret
  });
}
console.log('pusher is '+JSON.stringify(pusher));
module.exports = pusher;


