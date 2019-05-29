console.log('API Route Connected Successfully');


// Link to the Professional Connection Data
var connectionData = require('../data/connect.js');


// Includes Two Routes
function apiRoutes(app) {

  // A GET route with the url /api/connection. This will be used show possible professional connections.
  app.get('/api/connection', function (req, res) {
    res.json(connectionData);
  });

  // A POST routes /api/connection.
  app.post('/api/connection', function (req, res) {

    // Parse new connection input to get integers 
    var newConnection = {
      name: req.body.name,
      job: req.body.job,
      photo: req.body.photo,
      scores: []
    };
    var scoresArray = [];
    for(var i=0; i < req.body.scores.length; i++){
      scoresArray.push(parseInt(req.body.scores[i]) )
    }
    newConnection.scores = scoresArray;


    // Check the new professional entry with the existing professionals
    var scoreResultArray = [];
    for(var i=0; i < connectionData.length; i++){

      // Looks at each professional's scores and sum difference in points
      var currentComparison = 0;
      for(var j=0; j < newConnection.scores.length; j++){
        currentComparison += Math.abs( newConnection.scores[j] - connectionData[i].scores[j] );
      }

      // Push each comparison between the professional connection scores to array
      scoreResultArray.push(currentComparison);
    }

    // Determine the best match 
    var bestMatchPosition = 0; 
    for(var i=1; i < scoreResultArray.length; i++){
      
      // The better match is the lowest score in the comparison
      if(scoreResultArray[i] <= scoreResultArray[bestMatchPosition]){
        bestMatchPosition = i;
      }

    }

    // If the 2 professionals have the same results, then the NEWEST entry in the connectionData array is chosen
    var bestConnectionMatch = connectionData[bestMatchPosition];

    res.json(bestConnectionMatch);

    // Push the new professional to the connection data array for storage
    connectionData.push(newConnection);

  });

}

// Export for use in main server.js file
module.exports = apiRoutes;