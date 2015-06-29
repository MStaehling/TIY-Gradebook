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


  app.controller('MilestonesController', function($http) {
    var mile = this;
    mile.milestones = []
    $http.get('/api/github/repos/TIY/summerFee/issues_pg4.json')
      .then(function(response) {
        mile.milestones = response.data;

console.log(response.data[0].labels);
        var keepPraciticing = [];
        var labels = response.data[0].labels.filter(function(label){
          return !(label.name('Keep Praciticing') === -1);
        });
        console.log(labels);


      // keepPraciticing =  _.pluck(_.filter(labels, {name: 'Keep Praciticing'}), 'labels');
      // console.log(keepPraciticing);

        // _.forEach(labels, function(label) {
        //   if (labels.labels.name == 'Keep Praciticing') {
        //     return label.push(keepPraciticing);
        //   };
        //   console.log(keepPraciticing);
        // });
      });
  }); // End of MilestonesController








})(window);
