console.log("js loaded");
///Globals
var ranks = new Array ("01", "02", "03", "04", "05", "06","07","08","09","10","11","12","13");
var suits = new Array ("c", "d", "h", "s");
var deck = new Array ();
var playerOne = [];
var playerTwo = [];
var board = [];
var burnBoard = [];
///Deck functions
function makeDeck(m){

	var j, k;
	var m;
  	m = ranks.length * suits.length;
		for (j = 0; j< suits.length; j++)
			for (k = 0; k<ranks.length; k++){
				var newDeck= deck.push(suits[j]+ranks[k])
			
		
	};
}
function shuffle(n) {
	n=(Math.random()*100)
  var i, j, k;
  var temp;

  // Shuffle the stack 'n' times.

  for (i = 0; i < n; i++)
    for (j = 0; j < deck.length; j++) {
      k = Math.floor(Math.random() * deck.length);
      temp = deck[j];
      deck[j] = deck[k];
      deck[k] = temp;
    }
}
//Dirty dealings
function dealHands( ) {

  if (deck.length > 0){
    playerOne.push(deck.shift());
    $("#playerOneHand").append('<img src=assets/' + playerOne[0] + ".png>");
    playerTwo.push(deck.shift());
    $("#playerTwoHand").append('<img src=assets/' + playerTwo[0] + ".png>");
    playerOne.push(deck.shift());
    $("#playerOneHand").append('<img src=assets/' + playerOne[1] + ".png>");
    playerTwo.push(deck.shift());
    $("#playerTwoHand").append('<img src=assets/' + playerTwo[1] + ".png>");
 	} else
    return null;
}

function dealFlop(){
	if (deck.length > 0){
	burnBoard.push(deck.shift());
	board.push(deck.shift());
	board.push(deck.shift());
	board.push(deck.shift());
	} else
	return null;
}

function deal(){
	if (deck.length >0){
		burnBoard.push(deck.shift());
			board.push(deck.shift());
	} else
	return null;
}



