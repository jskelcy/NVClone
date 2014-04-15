'use strict';

var nvClone = angular.module('nvClone', [
  'ngRoute',
  'nvFilters',
  'nvServices',
  'nvDirectives',
  'nvControllers'
]);

nvClone.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/note.html', controller: 'NoteCtrl'});
  $routeProvider.when('/note/:id', {templateUrl: 'partials/note.html', controller: 'NoteCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);

nvClone.run(['updateLoop', function(updateLoop){
    var x = updateLoop;    
}]); 
