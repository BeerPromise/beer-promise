var app = angular.module('beerPromise', ['pusher-angular']);

app.controller('BeerPromiseController', ['$http','$pusher', function($http,$pusher){

  var pusher;

  var getSession = function (callback) {
    $http.get('/get-session').success(function(response){
      console.log('==APP_KEY== '+response.appKey);
      self.id = response.user;
      callback(response.appKey);
    });
  };

  getSession(function(appKey) {
    var pusherKey = appKey || '6722ac0ecaea2ee391e6';
    console.log('creating pusher with id: '+pusherKey);
    var client = new Pusher(pusherKey);
    pusher = $pusher(client);
    var channel = pusher.subscribe('order-channel');
  });


  self = this;

  this.id = "";

  this.beerCount = 0;

  this.addBeer = function() {
    this.beerCount += 1;
  };

  this.removeBeer = function() {
    self.beerCount--;
  };

  this.placeOrder = function() {
    console.log('Trying to place order');
    $http.get('/placeorder').success(function() {
      console.log('Order placed.');
    });
  };

}]);

app.controller('BeerBarController', ['$http', '$pusher', function($http, $pusher){

  var pusher;

  var getSession = function (callback) {
    $http.get('/get-session').success(function(response){
      console.log('==APP_ID== '+response.appKey);
      self.id = response.user;
      callback(response.appKey);
    });
  };

  getSession(function(appKey) {
    var pusherKey = appKey || '6722ac0ecaea2ee391e6';
    console.log('creating pusher with id: '+pusherKey);
    var client = new Pusher(pusherKey);
    pusher = $pusher(client);
    var channel = pusher.subscribe('order-channel');
    channel.bind('new-order', function(data) {
      console.log('Ow! You poked me!');
      console.log(JSON.stringify(data));
      self.orders = data.array;
    });
  });

  self = this;

  this.orders = ["No Orders"];





}]);

var notApp = angular.module('forProtractor', []);


