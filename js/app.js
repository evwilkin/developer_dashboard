var app = angular.module("DeveloperDashboard", ["DeveloperDashboardCtrl", "ui.router", "ngAnimate", "ui.bootstrap"])

.config([
  "$stateProvider",
  "$urlRouterProvider",
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    // Routes
    $stateProvider.state(
      "home", 
      {
        url:"/",
        templateUrl: "views/home.html",
        controller: ""
      }
    )
    .state(
      "login",
      {
        url: "/login",
        templateUrl: "views/login.html",
        controller: ""
      }
    )
    .state(
      "signup",
      {
        url: "/about",
        templateUrl: "views/about.html"
      }
    );
  }
]);