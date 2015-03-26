var app = angular.module('beerPromise', []);

app.controller('BeerPromiseController', ['$http', function($http){
  self = this;

  self.beerCount = 0;

  self.addBeer = function() {
    self.beerCount += 1;
  };

  self.removeBeer = function() {
    self.beerCount--;
  };

  $http.get('/get-session').success(function(response){
    self.id = response;
  });

}]);


