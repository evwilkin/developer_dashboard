angular.module('DeveloperDashboardCtrls', ['DeveloperDashboardServices'])

.controller('HomeCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {

}])
.controller('ProjectsCtrl', ['$scope', '$state', function($scope, $state) {
  
}])
.controller('LogoutCtrl', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {
  Auth.removeToken();
  $location.path('/');
}])
.controller('SignupCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userSignup = function() {
    $http.post('/api/users', $scope.user).then(function success (res) {
      $http.post('api/auth',$scope.user).then(function success (res){
        Auth.saveToken(res.data.token);
        $location.path('/');
      }, function error(res) {
        console.log(res.data);
      });
    });
  }
}])
.controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
  console.log("We are in Login");
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userLogin = function() {
    $http.post('/api/auth', $scope.user).then(function success(res) {
      Auth.saveToken(res.data.token);      
      $location.path('/');
    }, function error(res) {
      console.log(res.data);
    })
  }
}])