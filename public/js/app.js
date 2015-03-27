var app = angular.module('beerPromise', ['pusher-angular']);

app.controller('BeerPromiseController', ['$http','$pusher', function($http,$pusher){

  // dev -- 6722ac0ecaea2ee391e6
  // her -- 620b27081e518968e2d2

  var pusherID = '6722ac0ecaea2ee391e6';
  var client = new Pusher(pusherID);
  var pusher = $pusher(client);

  self = this;

  var channel = pusher.subscribe('order-channel');

  channel.bind('order-complete', function(data) {

    console.log('Order completed!');

  });


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

  // dev -- 6722ac0ecaea2ee391e6
  // her -- 620b27081e518968e2d2

  var pusherID = '6722ac0ecaea2ee391e6';
  var client = new Pusher(pusherID);
  var pusher = $pusher(client);

  self = this;

  this.orders = ["No Orders"];

  this.completeOrder = function(order) {
    // {beers:6, ID: "email"}
    // self.orders.delete(order);
    console.log('trying to complete order');
    $http.get('/completeorder/'+order.ID).success(function() {
      console.log('complete request sent');
    });


  };

  var channel = pusher.subscribe('order-channel');

  channel.bind('new-order', function(data) {
    console.log('Ow! You poked me!');
    console.log('--'+JSON.stringify(data));
    self.orders = data.array;
  });


}]);

var notApp = angular.module('forProtractor', []);


