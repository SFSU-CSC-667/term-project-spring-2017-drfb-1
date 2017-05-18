var express = require('express');
var router = express.Router();

const { GameUsers } = require('../db');
const { GameCards } = require('../db');
const { Cards } = require('../db');

router.post('/', function(req, res, next) {

  console.log('JOIN GAMEID: ' + req.body.gameid);

  res.redirect("game/" + req.body.gameid);

	// if(req.user) {
	// 	var userid = req.user.id;
	// 	var username = req.user.alias;
	// 	console.log(userid + ':' + username + ' joined the game');

 //  	Cards.all().then(cards => {
 //      res.render('game', {
 //      	cards, 
 //      	userid : userid, 
 //      	username : username
 //      });
 //    })

 //  } else {
 //  	res.redirect('/');
 //  }
});

router.get('/:id', function(req, res, next) {

  console.log('URL: ' + req.originalUrl);
  var gameid = req.originalUrl.split("/")[2];
  console.log('GAME ID: ' + gameid);

  if(req.user) {
    var userid = req.user.id;
    var username = req.user.alias;
    console.log(userid + ':' + username + ' joined the game');

    Cards.all().then(cards => {
      res.render('game', {
        cards, 
        userid : userid, 
        username : username
      });
    })

  } else {
    res.redirect('/');
  }

});

module.exports = router;
