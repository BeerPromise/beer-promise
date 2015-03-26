var app = angular.module('beerPromise', []);

app.controller('BeerPromiseController', ['$http', function($http){

  self = this;

  $http.get('/get-session').success(function(response){
    self.id = response;
  });

}]); 


