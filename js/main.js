console.log("js loaded");
///Globals
var ranks = new Array ("01", "02", "03", "04", "05", "06","07","08","09","10","11","12","13");
var suits = new Array ("c", "d", "h", "s");
var deck = new Array ();
var playerOne = [];
var playerTwo = [];
var board = [];
var burnBoard = [];
var playerOneBank = 100000
var playerTwoBank = 100000
var pot = 0
var player = 1
///Bet functions
function playerTurn(){
	if(player===1){
		$('#Turn').html("Player Two");
			player-=1;
	}else {
		$('#Turn').html("Player One");
			player+=1;	
	}
}
function makeBet(){

	if (player===1){
	
		playerOneBank= playerOneBank-parseInt($("#bet-input").val(),10);
		$('#playerOneBankVal').val(playerOneBank);
		pot=pot+ parseInt($("#bet-input").val(),10);
		$('#potValue').val(pot);
		playerTurn();

		}else{
		
		playerTwoBank= playerTwoBank-parseInt($("#bet-input").val(),10);
		$('#playerTwoBankVal').val(playerTwoBank);
		pot=pot+ parseInt($("#bet-input").val(),10);
		$('#potValue').val(pot);
		playerTurn();
	}

};
function makeCall(){
	if (player===1){
			playerOneBank=playerOneBank-pot;
		$('#playerOneBankVal').val(playerOneBank);
		pot=pot+ parseInt($("#bet-input").val(),10);
		$('#potValue').val(pot);



		} else{
	
	playerTwoBank=playerTwoBank-pot;
		$('#playerTwoBankVal').val(playerTwoBank);
		pot=pot+ parseInt($("#bet-input").val(),10);
		$('#potValue').val(pot);
		playerTurn();
			}
};
function makeBank(){
	$('#potValue').val(pot);
	$('#playerOneBankVal').val(playerOneBank);
	$('#playerTwoBankVal').val(playerTwoBank);
}
///Deck functions
function makeDeck(m){

	var j, k;
	var m;
  	m = ranks.length * suits.length;
		for (j = 0; j< suits.length; j++)
			for (k = 0; k<ranks.length; k++){
				var newDeck= deck.push(suits[j]+ranks[k])
			
		
	};
	makeBank();
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
	$("#burnBoardDisp").append('<img src=assets/' + burnBoard[0] + ".png>");
	board.push(deck.shift());
	$("#boardDisp").append('<img src=assets/' + board[0] + ".png>");
	board.push(deck.shift());
	$("#boardDisp").append('<img src=assets/' + board[1] + ".png>");
	board.push(deck.shift());
	$("#boardDisp").append('<img src=assets/' + board[2] + ".png>");
	} else
	return null;
}

function dealTurn(){
	if (deck.length >0){
		burnBoard.push(deck.shift());
		$("#burnBoardDisp").append('<img src=assets/' + burnBoard[1] + ".png>");
		board.push(deck.shift());
		$("#boardDisp").append('<img src=assets/' + board[3] + ".png>");
	} else
	return null;
}
function dealRiver(){
	if (deck.length >0){
		burnBoard.push(deck.shift());
		$("#burnBoardDisp").append('<img src=assets/' + burnBoard[2] + ".png>");
		board.push(deck.shift());
		$("#boardDisp").append('<img src=assets/' + board[4] + ".png>");
	} else
	return null;
}



