var app = angular.module('beerPromise', ['pusher-angular']);

app.controller('BeerPromiseController', ['$http','$pusher', function($http,$pusher){

  var client = new Pusher('6722ac0ecaea2ee391e6');
  var pusher = $pusher(client);

  self = this;

  var channel = pusher.subscribe('test-channel');



  this.testArray = ['uh'];

  this.testAddItem = function() {
    $http.get('/push-test').success(function() {
      console.log('The push-test was conducted.');
    });
  };

  this.id = "";

  this.beerCount = 0;

  this.addBeer = function() {
    this.beerCount += 1;
  };

  this.removeBeer = function() {
    self.beerCount--;
  };

  $http.get('/get-session').success(function(response){
    self.id = response;
  });

}]);

var notApp = angular.module('forProtractor', []);


