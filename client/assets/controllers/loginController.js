console.log("login controller is started");

app.controller('loginController', ['$scope', '$location', 'userFactory', '$cookieStore',  function ($scope, $location, userFactory, $cookieStore) {

  $scope.existingUser = {};
  $scope.error_messages = [];


  // -------------------------------------------------------------------------
  //                            Check Logged In User
  // -------------------------------------------------------------------------
  var CheckingUser = function () {
    if (!$cookieStore.get('logged-in')) {
      console.log("Not Logged In");
      // $location.url('/');
    } else {
      $location.url('/userdashboard');
    }
  };
  CheckingUser();

  // -------------------------------------------------------------------------
  //                            Login User
  // -------------------------------------------------------------------------
  $scope.login = function () {
    console.log($scope.existingUser);
    userFactory.login($scope.existingUser, function (dataFromServer) {
      if (dataFromServer.success === false) {
        console.log(dataFromServer.error_messages);
        $scope.success = false;
        $scope.error_messages = dataFromServer.error_messages;
      } else {
        if (dataFromServer.user.admin === 2) {
          console.log("Sending User to inventory");
          $scope.existingUser = {};
          $location.url('/inventory');
        } else {
          $scope.existingUser = {};
          $location.url('/userdashboard');
        }
      }
    });
  };





  // -------------------------------------------------------------------------
  //                            Login User
  // -------------------------------------------------------------------------
  // $scope.logout = function () {
  //   userFactory.logout(function (dataFromServer) {
  //     $scope.existingUser = {};
  //     $scope.success = false;
  //     $scope.error_messages = ["Successfully Logged Out"];
  //     $location.url('/');
  //   });
  // };

}]);