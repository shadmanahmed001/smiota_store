// console.log("tokenController");
app.controller('tokenController', ['$scope','mainFactory','$routeParams', '$location', function($scope, mainFactory, $routeParams, $location) {


  // This is the controller that will control the JSON token setting
mainFactory.facebook($routeParams.token);
  // Sending the user to the products page
  $location.path('/all')

}]);
