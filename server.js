var express = require('express'),
    app = express(),
    MongoClient = require('mongodb').MongoClient;


app.use(express.static(__dirname));
app.get('/api/notes', function(req, res) {
    MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
        if(err) throw err;
        console.log('connected to DB');
        var collection = db.collection('fakeNotes');
        
        collection.find().toArray(function(err, results){
            res.json(results);
        });
    });
});

app.get('/',function(req, res){
    res.redirect('/app/index.html');
});



app.listen(4000);


