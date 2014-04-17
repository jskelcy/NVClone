'use strict';

var nvDirectives = angular.module('nvDirectives', []);

nvDirectives.directive('focusOn', ['$routeParams', function($routeParams) {
    return {
        restrict: 'A',
        link: function(scope, elem, attr) {			
            scope.$on('$routeChangeSuccess', function(newRoute){
                if (angular.isDefined($routeParams.noteId)){
                    elem[0].focus(); 
                }
            });
        }
    }; 
}]);
