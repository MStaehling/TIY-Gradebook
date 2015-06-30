(function(window) {
    //with query.load
    // $('main.container').load('views/repositories.html');

    var app = angular.module('tiy-gradebook', []);


    app.controller('MainController', function() {
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
    }); // End of Main controller


    app.controller('ReposController', function($http) {
      var self = this;

      self.repos = [];

      $http.get('/api/github/repos/repos.json')
        .then(function(response) {
          self.repos = response.data.filter(function(year) {
            return !(year.name.indexOf('2') === -1);
          });
        }, function() {

        });
    }); // End of ReposController

  app.controller('MainController', function($http) {
    this.page = function(name) {

      this.view = 'views/404.html';
      if ( name == 'repositories') {
        this.view = 'views/repositories.html';
      }
      if ( name == 'milestones') {
        this.view = 'views/milestones.html';
      }
    }
    this.page('repositories');
  });

    app.controller('MilestonesController', function($http) {
        var mile = this;

        mile.milestones = []
        $http.get('/api/github/repos/TIY/summerFee/milestones.json')
          .then(function(response) {
            mile.milestones = response.data;
          })
      }); // End of MilestonesController





    })(window);
