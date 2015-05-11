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

  var checkPassword = function(entered, stored, callback) {

    bcrypt.compare(entered, stored, function(err, res) {
      callback(res);
    });
  };

  module.exports.createUser = createUser;
  module.exports.checkPassword = checkPassword;
}());