'use strict';

var nvFilters = angular.module('nvFilters', []);

nvFilters.filter('truncate', function() {
    return function(text) {
        if (!text) return '';
        var chars = 20;
        return text.slice(0, chars);
    };
});

