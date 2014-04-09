'use strict';

var nvFilters = angular.module('nvFilters', []);

nvFilters.filter('truncate', function() {
    return function(text) {
        var chars = 20;
        return [].slice.call(text, 0, chars).join('');
    };
});

