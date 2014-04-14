'use strict';

var nvFilters = angular.module('nvFilters', []);

nvFilters.filter('truncate', function() {
    return function(text) {
        if (!text) return '';
        var chars = 20;
        return text.slice(0, chars);
    };
});

nvFilters.filter('filterNotes', function() {
    return function (input, filterKey, filterVal) {
        if (!filterVal) return input;
        var filteredInput ={};
        angular.forEach(input, function(value, key){
            if(value[filterKey] && value[filterKey].indexOf(filterVal) !== -1){
                filteredInput[key]= value;
            }
        });
        return filteredInput;
    }
});
