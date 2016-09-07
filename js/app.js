// Declare app level module which depends on filters, and services
angular.module('fefcc', ['ui.router'])
    // .run(['$rootScope', function($rootScope){
    //     $rootScope.selected = {hi: 'ho'};
    // }])
    .factory('fish', function(){
        return {};
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('form',{
                url:'/form',
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            })
            .state('map',{
                url:'/map',
                templateUrl: 'views/map.html',
                controller: 'MapController'
            });
        $urlRouterProvider.otherwise('/form');
    }]);
