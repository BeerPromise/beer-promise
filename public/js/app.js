var app = angular.module('beerPromise', ['pusher-angular']);

app.controller('BeerPromiseController', ['$http','$pusher', function($http,$pusher){

  var pusherID = '620b27081e518968e2d2';
  var client = new Pusher(pusherID);
  var pusher = $pusher(client);

  self = this;

  var channel = pusher.subscribe('order-channel');


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

  $http.get('/get-session').success(function(response){
    self.id = response;
  });

}]);

app.controller('BeerBarController', ['$http', '$pusher', function($http, $pusher){

  var pusherID = '620b27081e518968e2d2';
  var client = new Pusher(pusherID);
  var pusher = $pusher(client);

  self = this;

  this.orders = ["No Orders"];

  var channel = pusher.subscribe('order-channel');

  channel.bind('new-order', function(data) {
    console.log('Ow! You poked me!');
    console.log(JSON.stringify(data));
    self.orders = data.array;
  });


}]);

var notApp = angular.module('forProtractor', []);


