var socket = io();

var userid = document.currentScript.getAttribute('userid')
var username = document.currentScript.getAttribute('username')
var gameid = 1
var playerCards = [];

var userData = {
  userid : userid,
  username : username,
  gameid : gameid,
  numberOfCardsInHand : 100,
  ready: false
}

var gameData = {
  gameid : gameid,
  cardTurnClockwise: false,
  currentPlayerTurn: 0,
  start: false,
  topcard: null
}

console.log("userid: " + userid);
console.log("gameid: " + gameid);

socket.emit('join_game', userData, gameData);

//GAME LOGIC 
var card_area = document.getElementById('card-area');



document.getElementById("drawFromDeck").addEventListener("click", function(cards){
  if(gameData.start){ 
    console.log( userData.username + " drew a card!");
    socket.emit('draw_card', userData);
  }
});

document.getElementById("UNO").addEventListener("click", function(){
  if(gameData.start){ 
    console.log('Uno');
    console.log("cardturn " + gameData.cardTurnClockwise);
    if(userData.numberOfCardsInHand != 1){
      console.log('Uno check failed. Penalty incurred!')
      var i
      for(i = 0; i<2; i++ ){
        socket.emit('draw_card', userData)
        userData.numberOfCardsInHand++;
      }
    }
  }
})



document.getElementById("ready").addEventListener("click", function(){
  console.log("User is ready to play!")
  userData.ready= true
})

document.getElementById("start").addEventListener("click", function(){
  gameData.start = ( userData.ready )? true:false;
  if(gameData.start){ 
    console.log('Game ready to start')
    var i
    console.log('Drawing initial hand')
    for(i = 0; i<7; i++){
      socket.emit('draw_card', userData)
      userData.numberOfCardsInHand++;
    }
    document.getElementById("ready").style.visibility = "hidden"
    document.getElementById("start").style.visibility = "hidden"
  }
})

socket.on('draw_card', function(gamecards, cardpath) {
  var card = gamecards.card_id;
  var path = cardpath.image;
  playerCards.push(cardpath);
  console.log("CP: Type; " + cardpath.card_type);
  console.log(card);
  console.log("PATH: " + path);
  renderCard(card, path);
  playerCards.forEach(function(index){
    console.log("PLAYERCARD LEN" + playerCards.length);
    console.log("PLAYERCARD Number: " + index.number);
    console.log("PLAYERCARD ID: " + index.id);
    console.log("PLAYERCARD Type: " + index.card_type);
  });
})

socket.on('init_topcard', function(tmpcard){
  gameData.topcard = tmpcard
  console.log('client set topcard')
})

function renderCard(card_id, cardpath) {
  var node = document.getElementById("card-area");
  console.log(node);
  var card = new Image(72, 120);
  card.src = cardpath;
  node.appendChild(card);
}

//Game Logic Start
//const socket = io();

// var cardTurnClockwise = false; //clockwise if true, counter clockwise if false
// var currentPlayerTurn = 0;
// var cardPlayed;
// var topCard;

// var playerInfo {

// // }

// $(function () {
// //   $('#start').hide();
// //   $('#ready').hide();
// //   $('#drawFromDeck').hide();
// //   $('#drawFromDiscardPile').hide();
// //   $('#UNO').hide();

// //   //Game Canvas buttons
// //   $('#start').click(function() {
// //     if($('#start').prop('disabled')) {
// //       return false;
// //     }else{
// //     socket.emit('start', playerInfo);
// //     }
// //   })

// //   $('#drawFromDeck').click(function() {
// //     $('#drawFromDeck').hide();
// //     //socket.emit('draw-cards', playerInfo);
// //   })

//  $('#drawFromDiscard').click(function() {
//    alert ("hi");
//    //$('#drawFromDiscardPile').hide();
//    //socket.emit('draw-cards', playerInfo);
//  })



// //   $('#UNO').click(function() {
// //     if($('UNO').prop('disabled')) {
// //   }else{
// //   socket.emit('UNO', myInfo, gameState);
// //   }
// //   return false;
// //   })

// // })


// document.getElementById("drawFromDeck").addEventListener("click", function(){
//    alert ("hi");
// });



function getNextPlayerTurn(){
  if (gameData.cardTurnClockwise){
    gameData.currentPlayerTurn--;
    if (gameData.currentPlayerTurn < 0){
      gameData.currentPlayerTurn = 3;
    }
  }
  else{
    gameData.currentPlayerTurn++;
    if (gameData.currentPlayerTurn > 3){
      gameData.currentPlayerTurn = 0;
    }
  }
}



// function isCurrentPlayerTurn(){
//   if (true){
//     //TODO: turn action
//   }
//   else alert ("Its not your turn");
// }

// function isValidPlay(){
//   //cardPlayed == top card
//   if (true){
//     return true;
//   }
//   else return false;
// }


// //TODO: maybe not needed?
// function cardAction(){

// }
// function Update(){
//   getNextPlayerTurn();

//   //TODO: UNO condition
// }