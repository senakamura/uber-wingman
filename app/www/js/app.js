(function (){

  var app = angular.module(
    'wingman',
    ['ionic',
    'ngResource',
    'uiGmapgoogle-maps'
    ]);


  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });

  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider){

    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller:'mainController as mainController'
      })
      .state('app.main', {
        url: '/main',
        views: {
          "menuContent": {
            templateUrl: 'templates/main.html'
          }
        }
      })
      .state('app.login', {
        url: '/login',
        views: {
          "menuContent": {
            templateUrl: 'templates/login.html'
          }
        }
      })
      .state('auth', {
        url:'/store-auth-token/:accessToken',
        controller: function ($stateParams, $state){
          localStorage.auth_token = $stateParams.accessToken;
          $state.go('app.main');
        }
      });

    $urlRouterProvider.otherwise('/app/main');

  }]);

  app.run(function ($rootScope, geolocation){
    $rootScope.userLocation = geolocation();
  });

})();


