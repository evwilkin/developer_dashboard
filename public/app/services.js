angular.module('DeveloperDashboardServices', ['ngResource'])

.factory('Auth', ['$window', function($window) {
  return { 
    saveToken: function(token) {
      $window.localStorage['devdash-token'] = token; 
    },
    getToken: function() {
      return $window.localStorage['devdash-token'];
    },
    removeToken: function() {
      $window.localStorage.removeItem('devdash-token');
    },
    isLoggedIn: function() { 
      var token = this.getToken();
      return token ? true : false;
    }
  };
}])

.factory('AuthInterceptor', ['Auth', function(Auth) {
  return {
    request: function(config) {
      var token = Auth.getToken();
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }
  }
}])