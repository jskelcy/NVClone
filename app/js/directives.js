'use strict';

var nvDirectives = angular.module('nvDirectives', []);

nvDirectives.directive('focusOn', ['$timeout', function($timeout) {
	return {
		restrict: 'A',
		link: function(scope, elem, attr) {			
			scope.$on(attr.focusOn, function(evt) {
				elem[0].focus();
			});
	   }
	} 
}]);
