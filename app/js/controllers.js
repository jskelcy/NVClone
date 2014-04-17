'use strict';

//all imports are taken care of at the app level

var nvControllers =  angular.module('nvControllers', ['ngRoute']);

nvControllers.controller('AppCtrl', ['$scope', '$location', 'styles', function($scope, $location, styles) {
    $scope.input = {
        q: null
    };
    //Take out of controller
    $scope.$watch('input.q', function(newVal, oldVal) {
        if (oldVal === null || newVal === oldVal) return;
        if (newVal === '') {
            $location.path('/');
        }        
    })
    $scope.styles = styles;
}]);

nvControllers.controller('NoteCtrl', ['$scope', '$routeParams','notesInMemory', 
function($scope, $routeParams, notesInMemory) {
    var noteId = $routeParams.id;
    $scope.notes = notesInMemory.notes;
    notesInMemory.notes.$promise.then(function() {
        $scope.targetNote = $scope.notes[noteId];
        $scope.input.q = angular.isDefined($scope.notes[noteId]) ? $scope.targetNote.title : '';
    });
    $scope.noteKeyPressHandler= function() {
        notesInMemory.updateNote(noteId, $scope.targetNote);
    }
}]);

nvControllers.controller('NotesCollectionCtrl',['$scope', '$location', '$rootScope', '$route', 'notesInMemory', 
function($scope, $location, $rootScope, $route, notesInMemory){
    $scope.notes = notesInMemory.notes;
    $scope.removeNote = function(noteId) {
        notesInMemory.removeNote(noteId);
        $location.path('/');
    }
    $scope.keypressHandler = function(evt) {
        if (evt.keyCode === 13) {
            var id = notesInMemory.addNote($scope.input.q);
            $location.path('/note/' + id);
            var deregister = $scope.$on('$routeChangeSuccess', function() {
                $rootScope.$broadcast('noteCreated');
                deregister();
            });
        }
    }
}]);