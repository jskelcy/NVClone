'use strict';

var nvServices = angular.module('nvServices', ['ngResource']);

nvServices.factory('noteData',[ '$resource', function($resource){
    return $resource('/api/notes/:id', {}, {
        query: {
           method:'GET', 
           cache: true,
           transformResponse: function(res, headers) {
               var result = JSON.parse(res);
               return Object.keys(result).reduce(function(acc, item){
                   acc[item].serverBody = acc[item].body;
                   acc[item].requestPending = false;
                   acc[item].deletedLocally = false;
                   return acc;
               }, result);
           }
        },
        update: { 
            method: 'PUT'
        }
    })
}]);

nvServices.factory('styles', function() {
   var styles = {
        note: {
            background: 'rgb(51,40,40)',
            color: 'rgb(97,194,154)'
        }
    };
    return styles;
})

nvServices.factory('updateLoop', ['notesInMemory', 'noteData', '$interval', '$window',
function(notesInMemory, noteData, $interval, $window){
    
    $interval(loop, 1000);

    function isNote(x) {
        return x.hasOwnProperty('body');
    }

    function isRequestPending(note) {
        return note.requestPending;
    }
    
    function createNote(noteId, note){
        if (note._id) return;
        note.requestPending = true;
        var newNote = new noteData(note);
        newNote.id = noteId;
        newNote.$save(function(resource){
            note.requestPending = false;
            note.serverBody = resource.serverNote.body;
            note._id = resource.serverNote._id;
            console.log('new', note);
        });
        return true;
    }

    function updateNote(noteId, note){
        if (note.body === note.serverBody) return;
        note.requestPending = true;
        noteData.update({id: noteId}, {body: note.body}, function(resource){
            note.serverBody = resource.serverNote.body;
            note.requestPending = false;
            console.log('updated', note);
        });
        return true;
    }
    
    function deleteNote(noteId, note) {
        if (!note.deletedLocally) return;
        note.requestPending = true;
        noteData.remove({id: noteId}, {}, function() {
            delete notesInMemory[noteId];
            console.log('removed', note);
        });
    }

    function loop(){
        if (!$window.navigator.onLine) return;
        // console.log('---loopin---');
        angular.forEach(notesInMemory.notes, function(note, noteId) {
            if (isNote(note) && !isRequestPending(note) ) {
                createNote(noteId, note) || updateNote(noteId, note) || deleteNote(noteId, note);
            } 
        });
    }

}]);


nvServices.factory('notesInMemory', ['noteData', function(noteData){
    var highest;
    var allNotesInMemory = noteData.query(function(data){
        highest = getMaxId(data);
    });

    function getMaxId(notes){
        return Math.max.apply(null, Object.keys(notes).filter(function(x) {
            return !isNaN(Number(x));
        }));
    }

    function updateNote(noteId, newNote){
        allNotesInMemory[noteId].body = newNote.body;
    }

    function removeNote(noteId){
        if (allNotesInMemory[noteId]) {
            allNotesInMemory[noteId].deletedLocally = true;
        }
    }

    function addNote(title) {
        allNotesInMemory[++highest] = {
            title: title,
            body: ''
        };
        return highest;
    }

    return {
        notes: allNotesInMemory,
        addNote: addNote,
        removeNote: removeNote,
        updateNote: updateNote 
    };

}]);
