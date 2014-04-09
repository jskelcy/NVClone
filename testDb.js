var MongoClient = require('mongodb').MongoClient;
    fs = require('fs');
MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
      if (err) throw err;
        console.log("Connected to Database");

        var file = 
});
