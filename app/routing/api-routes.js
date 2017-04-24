var express = require("express");
var path = require("path");
var fs = require("fs");

router = express.Router();

var data = fs.readFileSync('./app/data/friends.json');
var users = JSON.parse(data);


//A GET route with the url /api/friends. 
//This will be used to display a JSON of all possible friends.

router.get('/friends', function (req, res) {
	res.send(users);
});


// A POST routes /api/friends. 
//This will be used to handle incoming survey results. 
//This route will also be used to handle the compatibility logic.

router.post('/friends', function(req, res) {

	// req.body hosts is equal to the JSON post sent from the user
	var newFriend = req.body;

	var myMatch = returnMatch(newFriend);

	console.log(newFriend);

	var configFile = fs.readFileSync('./app/data/friends.json');
	var config = JSON.parse(configFile);
	config.push(newFriend);
	var configJSON = JSON.stringify(config);
	fs.writeFile('./app/data/friends.json', configJSON, finished);

	function finished(err) {
		console.log('all set.')	;
		reply = { 
			newFriend: newFriend,
			match: myMatch,
			status: "success"
		}
		res.send(reply );
	}

});


module.exports = router;



function returnMatch(user) {

	// var userData = { name: "test response name" }
	//"This isnt returning the right results, but damn I'm happy I got this far."

	var user1 = user.scores;

	var allResults = [];

	//loop through users
	for (var i = 0; i < users.length; i++) {
		var user2_scores = users[i].scores;

		//loop through the scores
		var total = [];
		for (var s = 0; s < user2_scores.length; s++) {

			//compare to user1's scores

			var firstNum;
			var secondNum;

			if(user1[s] > user2_scores[s]){
				firstNum = Number(user1[s]);
				secondNum = Number(user2_scores[s]);
			}else{
				secondNum = Number(user1[s]);
				firstNum = Number(user2_scores[s]);
			}

			total.push (firstNum - secondNum);
		}


		//push result into array of results
		//result and user number
		allResults.push( {sum: sumArray(total) , user: i} );
	}

	//sort the results
	allResults.sort(function(a, b){return a.sum - b.sum});

	//which is the lowest
	var picked = allResults[0].sum;
	
	//grab its corresponding user
	var matched = users[picked];

	return(matched);
}


function sumArray(array) {
  for (
    var
      index = 0,              // The iterator
      length = array.length,  // Cache the array length
      sum = 0;                // The total amount
      index < length;         // The "for"-loop condition
      sum += array[index++]   // Add number on each iteration
  );
  return sum;
}

