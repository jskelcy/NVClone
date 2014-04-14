'use strict';

var nvServices = angular.module('nvServices', ['ngResource']);

nvServices.factory('noteData',[ '$resource', function($resource){
    return $resource('/api/notes', {}, {
        query: {method:'GET', cache: true }
    })
}]);


nvServices.factory('notesInMemory', ['noteData', function(noteData){
    var highest;
    var allNotesInMemory = noteData.query(function(data){
        highest = getMaxId(data);    
    });

    function getMaxId(notes){
        return Math.max.apply(null, Object.keys(notes).filter(function(x) {
            return !isNaN(Number(x));
        }
        ));
    }

    function updateNote(noteId, newNote){
        allNotesInMemory[noteId].body = newNote.body;
    }
    
    function removeNote(noteId){
        allNotesInMemory[noteId] && delete allNotesInMemory[noteId];
    }

    function addNote(title) {
        allNotesInMemory[++highest] = {
            title: title,
            body: ''
        };
    }

    return {
        notes: allNotesInMemory,
        addNote: addNote,
        removeNote: removeNote,
        updateNote: updateNote 
    };

}]);
