(function(window) {
  //with query.load
  // $('main.container').load('views/repositories.html');

  var app = angular.module('tiy-gradebook', []);


  app.controller('MainController', function($http) {
    this.view = null;
    this.page = function(name) {
      this.view = 'views/404.html';
      if (name == 'repositories') {
        this.view = 'views/repositories.html';
      }
      if (name == 'milestones') {
        this.view = 'views/milestones.html';
      }
    }
    this.page('repositories');

    var self = this,
      app = this;

    $http.get('/api/github/repos/TIY/summerFee/milestones.json').then(function(response) {
      console.log(self);
    }, function() {

    });

  });
})(window);