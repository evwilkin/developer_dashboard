angular.module('DeveloperDashboardCtrl', ['DeveloperDashboardServices'])
.controller('AllRestaurantsCtrl', ['$scope', 'Restaurant', function($scope, Restaurant) {
  $scope.restaurants = [];

//get all restaurants
  Restaurant.query(function success(data) {
    $scope.restaurants = data;
  }, function error(data) {
    console.log(data);
  });
}])
//show a specific restaurant
.controller('ShowCtrl', ['$scope', '$stateParams', 'Restaurant', function($scope, $stateParams, Restaurant) {
  $scope.restaurant = {};

  Restaurant.get({id: $stateParams.id}, function success(data) {
    $scope.restaurant = data;
  }, function error(data) {
    console.log(data);
  });
}])
.controller('NavCtrl', ['$scope', 'Auth', '$state', function($scope, Auth, $state) {
  $scope.Auth = Auth;
  $scope.logout = function() {
    Auth.removeToken();
    $state.reload();
  }
}])
.controller('SignupCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userSignup = function() {
    $http.post('/api/users', $scope.user).then(function success (res) {
      $location.path('/');
    }, function error(res) {
      console.log(res);
    });
  }
}])
.controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userLogin = function() {
    $http.post('/api/auth', $scope.user).then(function success(res) {
      Auth.saveToken(res.data.token);      
      $location.path('/');
    }, function error(res) {
      console.log(res);
    })
  }
}])