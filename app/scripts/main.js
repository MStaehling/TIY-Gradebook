(function(window) {
  //with query.load
  // $('main.container').load('views/repositories.html');

  var app = angular.module('tiy-gradebook', []);
/* JORGE'S STUFF
        mile.milestones = []
        $http.get('/api/github/repos/TIY/summerFee/milestones.json')
          .then(function(response) {
            mile.milestones = response.data;
          })

          // keep = keep_practicing
          $http.get('/api/github/repos/issues/all_issues/keep_practicing.json')
            .then(function(response) {
              mile.labels = response.data.filter(function(keep){
                console.log(keep)
              })
            })

            // function(milestones, label){
            //
            //
            //
            // };
      }); // End of MilestonesController
      */

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
          return !(year.name.indexOf('201') === -1);
        });
      }, function() {

      });
  }); // End of ReposController



  app.controller('MilestonesController', function($http, $q) {
    var mile = this;

    mile.milestones = [];
    mile.notYet = {
      bgColor: '#00A300'
    };
    mile.keepPracticing = {
      bgColor: '#FFCD00'
    };
    mile.veryGood = {
      bgColor: '#F30000'
    };

    $http.get('/api/github/repos/TIY/summerFee/milestones.json')
      .then(function(response) {
        mile.milestones = response.data;
      });
    $http.get('/api/github/repos/issues/all_issues/0All.json')
      .then(function(response) {
        console.log(response);
        mile.notYet.width = progWidth(response, 'Not Yet');
        mile.keepPracticing.width = progWidth(response, 'Keep Practicing');
        mile.veryGood.width = progWidth(response, 'Very Good');
      });

  }); // End of MilestonesController

function progWidth (response, labelName) {
  return ((_(response.data)
    .pluck('labels')
    .flatten()
    .where({ name: labelName })
    .size()/10) * 100 + '%')
};

})(window);

/*_.forEach(coins, fn(coin) {
  if (coin == quarter) {
    quarters.push(coin);
  }
});*/
