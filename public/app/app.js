var app = angular.module("DeveloperDashboard", ["DeveloperDashboardCtrls", "ui.router", "ngAnimate", "ui.bootstrap", "ngResource"]);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/404');

//below sets up Angular routes
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'app/views/home.html',
    controller: 'HomeCtrl'
  })
  // .state('newRecipe', {
  //   url: '/recipes/new',
  //   templateUrl: 'app/views/newRecipe.html',
  //   controller: 'NewCtrl'
  // })
  // .state('recipeShow', {
  //   url: '/recipes/:id',
  //   templateUrl: 'app/views/showRecipe.html',
  //   controller: 'ShowCtrl'
  // })
  .state('signup', {
    url: '/signup',
    templateUrl: 'app/views/userSignup.html',
    controller: 'SignupCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'app/views/userLogin.html',
    controller: 'LoginCtrl'
  })
  .state('logout', {
    url: '/logout',
    controller: 'LogoutCtrl'
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
  .state('404', {
    url: '/404',
    templateUrl: 'app/views/404.html'
  });

  $locationProvider.html5Mode(true);
}])

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor'); 
}])
.run(["$rootScope", "Auth", function($rootScope, Auth){
  $rootScope.isLoggedIn = function (){
    return Auth.isLoggedIn.apply(Auth)
  }
}]);