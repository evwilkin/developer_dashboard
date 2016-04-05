angular.module('DeveloperDashboardServices', ['ngResource'])
.factory('Restaurant', ['$resource', function($resource) {
  return $resource('/api/restaurants/:id');
}])

.factory('Auth', ['$window', function($window) {
  return { 
    saveToken: function(token) {
      $window.localStorage['secretrestaurants-token'] = token; 
    },
    getToken: function() {
      return $window.localStorage['secretrestaurants-token'];
    },
    removeToken: function() {
      $window.localStorage.removeItem('secretrestaurants-token');
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