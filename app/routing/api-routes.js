var express = require("express");
var path = require("path");
var fs = require("fs");

router = express.Router();

var data = fs.readFileSync('./app/data/friends.js');
var users = JSON.parse(data);

//A GET route with the url /api/friends. 
//This will be used to display a JSON of all possible friends.

router.get('/friends', function (req, res) {
	// res.sendFile(path.join(__dirname, "../public/survey.html"));

	res.send(users);
});

// A POST routes /api/friends. 
//This will be used to handle incoming survey results. 
//This route will also be used to handle the compatibility logic.

router.post('/friends', function(req, res) {

	var txt = req.body.text;

	console.log(txt);


  // // req.body hosts is equal to the JSON post sent from the user
  // var newFriend = req.body;

  // console.log(newFriend);

  // // We then add the json the user sent to the character array
  // users.push(newFriend);

  // // We then display the JSON to the users
  // res.json(newFriend);

});


module.exports = router;




