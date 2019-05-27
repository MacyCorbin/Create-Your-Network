var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');



// html and api routes links
var apiRoutes = require('./app/routing/apiRoutes.js');
var htmlRoutes = require('./app/routing/htmlRoutes.js');



// Set up Express App
var app = express();
var PORT = process.env.PORT || 3000;



// This uses the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));



// Server Routing Map for api routes and html routes
apiRoutes(app); 
htmlRoutes(app); 

app.use(express.static('app/public'));

// Listener 
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});