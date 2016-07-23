angular.module('DeveloperDashboardServices', ['ngResource'])

.factory('Project', ['$resource', function($resource) {
  return $resource('/api/projects/:id', { id: '@_id' }, {
        update: { method:'PUT' }
    });
}])

.factory('Todo', ['$resource', function($resource) {
  return $resource('/api/todos/:id');
}])

.factory('Note', ['$resource', function($resource) {
  return $resource('/api/notes/:id');
}])

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
  };
}]);