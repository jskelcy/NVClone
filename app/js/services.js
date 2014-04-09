'use strict';

var nvServices = angular.module('nvServices', ['ngResource']);

nvServices.factory('noteData',[ '$resource', function($resource){
    return $resource('/app/data/fakeData.json', {}, {
        query: {method:'GET' , isArray: true ,cache: true }
    })
}]);
