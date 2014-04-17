'use strict';

var nvClone = angular.module('nvClone', [
  'ngRoute',
  'nvFilters',
  'nvServices',
  'nvDirectives',
  'nvControllers',
  'colorpicker.module'
]);

nvClone.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/note.html', controller: 'NoteCtrl'});
  $routeProvider.when('/note/:noteId', {templateUrl: 'partials/note.html', controller: 'NoteCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);

nvClone.run(['updateLoop', function(updateLoop){
    var x = updateLoop;    
}]); 
