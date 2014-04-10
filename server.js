var express = require('express'),
    app = express(),
    MongoClient = require('mongodb').MongoClient;


app.use(express.static(__dirname));
app.use(express.bodyParser());

var dbUri = 'mongodb://127.0.0.1:27017/test';
var dbCollection = 'fakeNotes';

app.get('/api/notes', function(req, res) {
    MongoClient.connect(dbUri, function(err, db) {
        if (err) throw err;
        var collection = db.collection(dbCollection);
        
        collection.find().toArray(function(err, results){
            res.json(results);
        });
    });
});

app.get('/api/notes/:id', function(req, res) {
    var noteId = parseInt(req.params.id, 10);

    MongoClient.connect(dbUri, function(err, db) {
        if (err) throw err;
        var collection = db.collection(dbCollection);
        
        collection.find({id: noteId}).toArray(function(err, results){
            res.json(results);
        });
    });
});

app.post('/api/notes', function(req, res) {
    var data = {
        body: req.body.body,
        title: req.body.title,
        id: parseInt(req.body.id, 10)
    };
    MongoClient.connect(dbUri, function(err, db) {
        if (err) throw err;
        var collection = db.collection(dbCollection);

        collection.insert(data, 
            function(err, inserted) {
                if (err) throw err;
                res.send(200);
        });
    });
});

app.put('/api/notes/:id', function(req, res){
    var noteId = parseInt(req.params.id, 10);
    
    var updateData = {};
    if (req.body.body) updateData.body = req.body.body;
    if (req.body.title) updateData.title = req.body.title;

    MongoClient.connect(dbUri, function(err, db) {
        if (err) throw err;
        var collection = db.collection(dbCollection);

        collection.update({id: noteId}, {$set: updateData}, {}, function(err){
            if(err) throw err;
            res.send(200);
        });
    });
});

app.delete('/api/notes/:id',function(req, res) {
    var noteId = parseInt(req.params.id, 10);

    MongoClient.connect(dbUri, function(err, db) {
        var collection = db.collection(dbCollection);
        collection.remove({id: noteId}, function(err){
            if(err) throw err;
            res.send(200);
        });
    });
});

app.get('/',function(req, res){
    res.redirect('/app/index.html');
});

app.listen(4000);


