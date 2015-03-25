(function() {
var bcrypt = require('bcrypt');

var createUser = function(email, password, callback) {
  var customer = {};
  customer.email = email;
  bcrypt.hash(password, 10, function(err, hash) {
    customer.password = hash;
    callback(customer);
  });
};

  module.exports = createUser;


}());