(function(){
  var app = angular.module('beerPromise',[]);

  app.controller('CustomerLoginController', ['$http', function($http){

  }]);

  app.controller('CreateCustomerController', ['$http', function($http){
   this.createCustomer = function(){
    $http.post('/createcustomer', this.customer).success(function(response){
      console.log(response);
    });
   };     
  }]);

})();  