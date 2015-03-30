var app = angular.module('beerPromise', ['pusher-angular']);

app.controller('BeerPromiseController', ['$http','$pusher', '$window', function($http,$pusher,$window){

  // dev -- 6722ac0ecaea2ee391e6
  // her -- 620b27081e518968e2d2

  var pusherID = 'fefe508c9cbb908d2a14';
  var client = new Pusher(pusherID);
  var pusher = $pusher(client);

  self = this;

  var channel = pusher.subscribe('order-channel');

  channel.bind('order-complete', function(data) {


    $window.location.href = '/ticket.html';

//     $http.get('/getyourticket').success(function() {
//       console.log('EVErythING WORKING');
//     });



  });


  self.id = "";

  self.beerCount = 0;

  self.addBeer = function() {
    self.beerCount += 1;
  };

  self.removeBeer = function() {
    self.beerCount--;
  };

  self.placeOrder = function() {
    console.log('Trying to place order');
    $http.get('/placeorder/'+self.beerCount).success(function() {
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

  var pusherID = 'fefe508c9cbb908d2a14';
  var client = new Pusher(pusherID);
  var pusher = $pusher(client);

  self = this;

  self.orders = [];

  self.completeOrder = function(order) {
    // self.orders.delete(order);

    console.log("Order is "+JSON.stringify(order));
    console.log('trying to complete order');
    $http.get('/completeorder/'+order.orderID).success(function() {
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


