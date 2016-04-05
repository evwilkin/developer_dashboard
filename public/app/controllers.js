angular.module('DeveloperDashboardCtrls', ['DeveloperDashboardServices'])

.controller('HomeCtrl', ['$scope', 'Project', function($scope, Project) {
  console.log("We are in HomeCtrl inside App");
  $scope.projects = [];
  // Get all projects
  Project.query(function success(res) {
    $scope.projects = res;
  }, function error(res) {
    console.log(res);
  });
}])
.controller('ProjectsCtrl', ['$scope', 'Project', function($scope, Project) {
  console.log("We are in Projects controller inside App");
  $scope.projects = [];

//get all projects
  Project.query(function success(res) {
    $scope.projects = res;
  }, function error(res) {
    console.log(res);
  });
//delete projects
  $scope.deleteProject = function(id, projectsIdx) {
    Project.delete({id: id}, function success(res) {
      $scope.projects.splice(projectsIdx, 1);
    }, function error(res) {
      console.log(res);
    });
  }
}])
.controller('ShowProjectCtrl', ['$scope', '$stateParams', 'Project', function($scope, $stateParams, Project) {
  console.log("We are in ShowProjects controller inside App");
  $scope.project = {};

//get all projects
  Project.get({id: $stateParams.id}, function success(res) {
    $scope.project = res;
  }, function error(res) {
    console.log(res);
  });
}])
.controller('NewProjectCtrl', ['$scope', '$state', '$location', 'Project', function($scope, $state, $location, Project) {
  console.log("We are in NewProject controller inside App");
  $scope.project = {
    name: '',
    description: '',
    technologies: [],
    userStories: [],
    requirements: [],
    link: '',
    todos: []
  };
  $scope.newProject = function() {
    Project.save($scope.project, function success (res) {
      $location.path('/projects');
    }, function error(res) {
      console.log(res);
    });
  }
}])
.controller('LogoutCtrl', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {
  console.log("Logout Controller inside App");
  Auth.removeToken();
  $location.path('/');
}])
.controller('SignupCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
  console.log("We are in Signup controller inside App");
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
  console.log("We are in Login controller inside App");
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