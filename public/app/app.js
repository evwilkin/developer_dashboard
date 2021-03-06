var app = angular.module("DeveloperDashboard", ["DeveloperDashboardCtrls", "ui.router", "ngAnimate", "ui.bootstrap", "ngResource"]);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/404');
  // Below sets up Angular routes
  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'app/views/home.html',
    controller: 'HomeCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'app/views/userSignup.html',
    controller: 'SignupCtrl'
  })
  .state('login', {
    url: '/',
    templateUrl: 'app/views/userLogin.html',
    controller: 'LoginCtrl'
  })
  .state('logout', {
    url: '/logout',
    controller: 'LogoutCtrl'
  })
  .state('todos', {
    url: '/todos',
    templateUrl: 'app/views/todos.html',
    controller: 'TodoCtrl'
  })
  .state('showTodo', {
    url: '/todos/:id',
    templateUrl: 'app/views/showTodo.html',
    controller: 'ShowTodoCtrl'
  })
  .state('projects', {
    url: '/projects',
    templateUrl: 'app/views/projects.html',
    controller: 'ProjectsCtrl'
  })
  .state('newProject', {
    url: '/projects/new',
    templateUrl: 'app/views/newProject.html',
    controller: 'NewProjectCtrl'
  })
  .state('showProject', {
    url: '/projects/:id',
    templateUrl: 'app/views/showProject.html',
    controller: 'ShowProjectCtrl'
  })
  //EDIT PROJECT
  .state('editProject', {
    url: '/projects/:id',
    templateUrl: 'app/views/newProject.html',
    controller: 'EditProjectCtrl'
  })
  .state('notes', {
    url: '/notes',
    templateUrl: 'app/views/notes.html',
    controller: 'NoteCtrl'
  })
  .state('newNote', {
    url: '/notes/new',
    templateUrl: 'app/views/newNote.html',
    controller: 'NoteCtrl'
  })
  .state('404', {
    url: '/404',
    templateUrl: 'app/views/404.html'
  });

  $locationProvider.html5Mode(true);
}]);

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor'); 
}])
.run(["$rootScope", "Auth", function($rootScope, Auth){
  $rootScope.isLoggedIn = function (){
    return Auth.isLoggedIn.apply(Auth);
  };
}]);