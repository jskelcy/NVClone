var express = require('express'),
    app = express(),
    MongoClient = require('mongodb').MongoClient;


app.use(express.static(__dirname));
app.use(express.bodyParser());

var dbUri = 'mongodb://127.0.0.1:27017/test',
    dbCollection = 'fakeNotes',
    port = 2000;

//get all the notes when you log in
app.get('/api/notes', function(req, res) {
    MongoClient.connect(dbUri, function(err, db) {
        if (err) throw err;
        var collection = db.collection(dbCollection);
        
        collection.find().toArray(function(err, results){
            //reudces array into json obj where id is key and obj is value
            //deletes id inside value
            res.json(results.reduce(function(acc, item) {
                acc[item.id] = item;
                delete acc[item.id].id;
                return acc;
            }, {}));
        });
    });
});


//get one note with noteId equal to id
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


//create a new note
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
                res.json({serverNote: inserted[0]});
        });
    });
});


//update note
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
            res.json({serverNote: updateData});
        });
    });
});


//get rid of a note
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

app.listen(port);
console.log('server running on port', port)


