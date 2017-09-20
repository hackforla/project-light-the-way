var mongo = require('mongodb').MongoClient;
var app = require('express')();
var url = 'mongodb://user1:password1@ds141524.mlab.com:41524/light-the-way';


mongo.connect(url, function(err, db) {
    
  if (err) throw err;
  
  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/modules/core/client/views/home.client.view.html');  
  });
    
  app.get('/about-us', function (req, res) {
    //Retrieve about-us document from the db
    db.collection('general').find({ section: 'about-us' }).toArray(function (err, result) {
      if (err) throw err;
      var doc = result[0];
      //Send the document to client
      res.json(doc);
      res.end();
    })               
  });
  app.listen(5000);  
    
});