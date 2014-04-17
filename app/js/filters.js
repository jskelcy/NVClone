'use strict';

var nvFilters = angular.module('nvFilters', []);

nvFilters.filter('truncate', function() {
    return function(text) {
        if (!text) return '';
        var chars = 35;
        return text.slice(0, chars);
    };
});

nvFilters.filter('filterNotes', function() {
    return function (input, filterKey, filterVal) {
        var filteredInput ={};
        angular.forEach(input, function(value, key) {
            if (!filterVal && !value.deletedLocally) {
                filteredInput[key]= value;
            }
            else if (value[filterKey] && 
                    value[filterKey].indexOf(filterVal) !== -1 &&
                    !value.deletedLocally){
                    filteredInput[key]= value;
            }
        });
        return filteredInput;
    }
});
