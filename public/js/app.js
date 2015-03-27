var app = angular.module('beerPromise', ['pusher-angular']);

app.controller('BeerPromiseController', ['$http','$pusher', '$window', function($http,$pusher,$window){

<<<<<<< HEAD
  var pusher;
=======
  // dev -- 6722ac0ecaea2ee391e6
  // her -- 620b27081e518968e2d2

  var pusherID = '6722ac0ecaea2ee391e6';
  var client = new Pusher(pusherID);
  var pusher = $pusher(client);
>>>>>>> 790a4453eacebd0f6a230e4242c1308f6d63aa9a

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


<<<<<<< HEAD
  self = this;
=======
  channel.bind('order-complete', function(data) {


    $window.location.href = '/ticket.html';

//     $http.get('/getyourticket').success(function() {
//       console.log('EVErythING WORKING');
//     });



  });

>>>>>>> 790a4453eacebd0f6a230e4242c1308f6d63aa9a

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
    $http.get('/placeorder').success(function() {
      console.log('Order placed.');
    });
  };

}]);

app.controller('BeerBarController', ['$http', '$pusher', function($http, $pusher){

<<<<<<< HEAD
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
    console.log(JSON.stringify(pusher));
    var channel = pusher.subscribe('order-channel');
    console.log(JSON.stringify(channel));
    channel.bind('new-order', function(data) {
      console.log('Ow! You poked me!');
      console.log(JSON.stringify(data));
      self.orders = data.array;
    });
  });

  self = this;

  self.orders = ["No Orders"];

=======
  // dev -- 6722ac0ecaea2ee391e6
  // her -- 620b27081e518968e2d2

  var pusherID = '6722ac0ecaea2ee391e6';
  var client = new Pusher(pusherID);
  var pusher = $pusher(client);

  self = this;

  self.orders = [];

  self.completeOrder = function(order) {
    // self.orders.delete(order);

//     for(var i=0;i<self.orders.length;i++) {
//       if(self.orders[i].orderID == order.orderID) {
//         data.splice(i, 1);
//         break;
//       }
//     }

    console.log("Order is "+JSON.stringify(order));
    console.log('trying to complete order');
    $http.get('/completeorder/'+order.orderID).success(function() {
      console.log('complete request sent');
    });


  };
>>>>>>> 790a4453eacebd0f6a230e4242c1308f6d63aa9a


<<<<<<< HEAD
=======
  channel.bind('new-order', function(data) {
    console.log('Ow! You poked me!');
    console.log('--'+JSON.stringify(data));
    self.orders = data.array;
  });
>>>>>>> 790a4453eacebd0f6a230e4242c1308f6d63aa9a


}]);

var notApp = angular.module('forProtractor', []);


