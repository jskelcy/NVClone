'use strict';

//all imports are taken care of at the app level

var nvControllers =  angular.module('nvControllers', []);

nvControllers.controller('NoteCtrl', ['$scope','noteData', '$routeParams', function($scope, noteData, $routeParams) {
    $scope.noteId = $routeParams.id;
    $scope.notes = noteData.query(function(){
        $scope.targetNote = $scope.notes[$scope.noteId];
    });
}]);

nvControllers.controller('NotesCollectionCtrl',['$scope','noteData', function($scope, noteData){
    $scope.notes = noteData.query();
}]);
