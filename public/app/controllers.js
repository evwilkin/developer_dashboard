angular.module('DeveloperDashboardCtrls', ['DeveloperDashboardServices'])
.controller('NavCtrl', ['$scope', 'Auth', '$state', '$location', function($scope, Auth, $state, $location) {
  $scope.date = new Date();
  $scope.isCollapsed = true;
  $scope.Auth = Auth;
  $scope.logout = function() {
    Auth.removeToken();
    $state.go('login');
  };
}])
.controller('HomeCtrl', ['$scope', '$state', 'Auth', function($scope, $state, Auth) {
  if (!Auth.isLoggedIn()) {
    $state.go('login');
  }
  $scope.height = window.innerHeight;
}])
.controller('TabsCtrl', ['$scope', '$state', function($scope, $state) {
  $scope.home = function() {
    $state.go('home');
  };
  $scope.todos = function() {
    $state.go('todos');
  };
  $scope.notes = function() {
    $state.go('notes');
  };
  $scope.projects = function() {
    $state.go('projects');
  };
}])
.controller('NewsCtrl', ['$scope', '$state', '$http', 'Auth', function($scope, $state, $http, Auth) {
  if (!Auth.isLoggedIn()) {
    $state.go('login');
  }
  $scope.news = [];
  $http.get('https://hacker-news.firebaseio.com/v0/newstories.json').then(function(res) {
    for (var i = 0; i < 10; i++) {
      $http.get("https://hacker-news.firebaseio.com/v0/item/"+res.data[i]+".json").then(function(data) {
        $scope.news.push(data.data);
      });
    }
  });
}])
.controller('ProjectsCtrl', ['$scope', '$state', 'Project', 'Auth', '$location', function($scope, $state, Project, Auth, $location) {
  if (!Auth.isLoggedIn()) {
    $state.go('login');
  }
  $scope.projects = [];

//get all projects
  Project.query(function success(res) {
    $scope.projects = res;
  }, function error(res) {
    console.log(res);
    $location.path('/404');
  });
//delete projects
  $scope.deleteProject = function(id, projectsIdx) {
    Project.delete({id: id}, function success(res) {
      $scope.projects.splice(projectsIdx, 1);
    }, function error(res) {
      console.log(res);
      $location.path('/404');
    });
  };
}])
.controller('ShowProjectCtrl', ['$scope', '$stateParams', '$state', 'Auth', 'Project', function($scope, $stateParams, $state, Auth, Project) {
  if (!Auth.isLoggedIn()) {
    $state.go('login');
  }
  $scope.project = {};

//get a specific project
  Project.get({id: $stateParams.id}, function success(res) {
    $scope.project = res;
  }, function error(res) {
    console.log(res);
    $location.path('/404');
  });

  //Edit a specific project
  $scope.editProject = function() {
    $state.go('editProject', {
      id: $stateParams.id
    });
  };
}])
.controller('NewProjectCtrl', ['$scope', '$state', '$location', 'Project', 'Auth', function($scope, $state, $location, Project, Auth) {
  if (!Auth.isLoggedIn()) {
    $state.go('login');
  }
  $scope.project = {
    name: '',
    description: '',
    technologies: [],
    userStories: [],
    requirements: [],
    link: ''
  };
  $scope.new = true;
  $scope.newProject = function() {
    Project.save($scope.project, function success (res) {
      $location.path('/projects');
    }, function error(res) {
      console.log(res);
      $location.path('/404');
    });
  };
}])

// EDIT A PROJECT
.controller('EditProjectCtrl', ['$scope', '$state', '$location', '$stateParams', 'Project', 'Auth', function($scope, $state, $location, $stateParams, Project, Auth) {
  if (!Auth.isLoggedIn()) {
    $state.go('login');
  }
  $scope.project = {};
  $scope.new = false;

  Project.get({id: $stateParams.id}, function success(res) {
    $scope.project = res;
  }, function error(res) {
    console.log(res);
    $location.path('/404');
  });

  $scope.newProject = function() {
    Project.update({ id: $scope.project.id}, $scope.project.id, function success (res) {
      $location.path('/projects');
    }, function error(res) {
      console.log(res);
      $location.path('/404');
    });
  };
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
        $location.path('/home');
      }, function error(res) {
        console.log(res.data);
        $location.path('/404');
      });
    });
  };
}])
.controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
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
      $location.path('/404');
    });
  };
}])
.controller('TodoCtrl', ['$scope', '$state', 'Auth', 'Todo', function($scope, $state, Auth, Todo) {
  if (!Auth.isLoggedIn()) {
    $state.go('login');
  }
  $scope.todos = [];
  $scope.height = window.innerHeight;

  //get all Todos
  Todo.query(function success(res) {
    $scope.todos = res;
  }, function error(res) {
    console.log(res);
    $location.path('/404');
  });
  //delete Todos
  $scope.newTodo = function() {
    Todo.save($scope.todo, function success (res) {
      $scope.todo={ body: '' };
      $scope.todos.push(res);
    }, function error(res) {
      console.log(res);
      $location.path('/404');
    });
  };
  $scope.deleteTodo = function(id, todosIdx) {
    Todo.delete({id: id}, function success(res) {
      $scope.todos.splice(todosIdx, 1);
    }, function error(res) {
      console.log(res);
      $location.path('/404');
    });
  };
  $scope.todo = {
    body: ''
  };
}])
.controller('ShowTodoCtrl', ['$scope', '$stateParams', '$state', 'Auth', 'Todo', function($scope, $stateParams, $state, Auth, Todo) {
  if (!Auth.isLoggedIn()) {
    $state.go('login');
  }
  $scope.todo = {};

//get a specific todo
  Todo.get({id: $stateParams.id}, function success(res) {
    $scope.todo = res;
    console.log(res);
  }, function error(res) {
    console.log(res);
    $location.path('/404');
  });
}])
.controller('NoteCtrl', ['$scope', '$location', '$uibModal', '$state', 'Auth', 'Note', function($scope, $location, $uibModal, $state, Auth, Note) {
  if (!Auth.isLoggedIn()) {
    $state.go('login');
  }
  $scope.notes = [];

  //get all Notes
  Note.query(function success(res) {
    $scope.notes = res;
  }, function error(res) {
    console.log(res);
    $location.path('/404');
  });
  //create new Note
  $scope.newNote = function() {
    Note.save($scope.note, function success (res) {
      $location.path('/home');
    }, function error(res) {
      console.log(res);
      $location.path('/404');
    });
  };
  //Delete note
  $scope.deleteNote = function(id, notesIdx) {
    Note.delete({id: id}, function success(res) {
      $scope.notes.splice(notesIdx, 1);
    }, function error(res) {
      console.log(res);
      $location.path('/404');
    });
  };
  // Open new note Modal
  /*$scope.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'newNote.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
  };*/
}]);

/*.controller('ModalDemoCtrl', function ($scope, $uibModal, $log) {
  $scope.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'newNote.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    
  };

})*/

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

/*.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});*/