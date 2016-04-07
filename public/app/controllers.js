angular.module('DeveloperDashboardCtrls', ['DeveloperDashboardServices'])
.controller('NavCtrl', ['$scope', 'Auth', '$state', '$location', function($scope, Auth, $state, $location) {
  $scope.date = new Date();
  $scope.Auth = Auth;
  $scope.logout = function() {
    Auth.removeToken();
    $state.go('login');
  }
}])
.controller('NewsCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.news = [];
  $http.get('https://hacker-news.firebaseio.com/v0/newstories.json').then(function(res) {
    for (var i = 0; i < 10; i++) {
      $http.get("https://hacker-news.firebaseio.com/v0/item/"+res.data[i]+".json").then(function(data) {
        $scope.news.push(data.data);
      });
    }
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
    link: ''
  };
  $scope.newProject = function() {
    Project.save($scope.project, function success (res) {
      $location.path('/projects');
    }, function error(res) {
      console.log(res);
    });
  }
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
        $location.path('/home');
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
      $location.path('/home');
    }, function error(res) {
      console.log(res.data);
    })
  }
}])
.controller('TodoCtrl', ['$scope', 'Todo', function($scope, Todo) {
  console.log("We are in Todo controller inside App");
  $scope.todos = [];

  //get all Todos
  Todo.query(function success(res) {
    $scope.todos = res;
  }, function error(res) {
    console.log(res);
  });
  //delete Todos
  $scope.newTodo = function() {
    Todo.save($scope.todo, function success (res) {
      $scope.todo={ body: '' };
      $scope.todos.push(res);
    }, function error(res) {
      console.log(res);
    });
  };
  $scope.deleteTodo = function(id, todosIdx) {
    Todo.delete({id: id}, function success(res) {
      $scope.todos.splice(todosIdx, 1);
    }, function error(res) {
      console.log(res);
    });
  };
  $scope.todo = {
    body: ''
  };
}])
.controller('NoteCtrl', ['$scope', '$location', 'Note', function($scope, $location, Note) {
  console.log("We are in Todo controller inside App");
  $scope.notes = [];

  //get all Notes
  Note.query(function success(res) {
    $scope.notes = res;
  }, function error(res) {
    console.log(res);
  });
  //create new Note
  $scope.newNote = function() {
    Note.save($scope.note, function success (res) {
      $location.path('/home');
    }, function error(res) {
      console.log(res);
    });
  };
  //Delete note
  $scope.deleteNote = function(id, notesIdx) {
    Note.delete({id: id}, function success(res) {
      $scope.notes.splice(notesIdx, 1);
    }, function error(res) {
      console.log(res);
    });
  };
}]);