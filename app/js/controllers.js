'use strict';

//all imports are taken care of at the app level

var nvControllers =  angular.module('nvControllers', []);

nvControllers.controller('NoteCtrl', ['$scope', '$routeParams','notesInMemory', function($scope, $routeParams, notesInMemory) {
    var noteId = $routeParams.id;
    $scope.notes = notesInMemory.notes;
    notesInMemory.notes.$promise.then(function() {
        $scope.targetNote = $scope.notes[noteId];
    });
    $scope.noteKeyPressHandler= function() {
        notesInMemory.updateNote(noteId, $scope.targetNote);
    }
}]);

nvControllers.controller('NotesCollectionCtrl',['$scope','notesInMemory', function($scope, notesInMemory){
    $scope.notes = notesInMemory.notes;
    $scope.removeNote = notesInMemory.removeNote; 
    $scope.keypressHandler = function(evt) {
        if (evt.keyCode === 13){
            notesInMemory.addNote($scope.query);
        }
    }
}]);
