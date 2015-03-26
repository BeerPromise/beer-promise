(function(){
  var app = angular.module('beerPromise',[]);


  app.controller('CustomerController', function() {
    
    this = self

    self.session = {};

    self.createCustomer = function(){  
      $http.post('/createcustomer', self.customer).success(function(response){
        self.session = response;
      });  
    };
    self.destroySession = function(){
      self.session = {};
    };
  });


})();
