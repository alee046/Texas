console.log("js loaded");

///Globals
var ranks = new Array ("02", "03", "04", "05", "06","07","08","09","10","11","12","13","14");
var suits = new Array ("c", "d", "h", "s");
var deck = [];
var playerOne = [];
var playerTwo = [];/// make object
var rankEval = [];
var suiteEval = [];
var board = [];
var burnBoard = [];
var playerOneBank = 100000;
var playerTwoBank = 100000;
var tPot = 0;
var rPot= 0;
var player = 1;
var turnCount = 0;
var h
///Bet functions
function playerTurn(){
	if(player===1){
		$('#Turn').html("Player Two");
			player-=1;
	}else {
		$('#Turn').html("Player One");
			player+=1;	
	} turnCount+=1;
}
function checkMove(){
	if(isNaN($('#bet-input'))==true){
			rPot=0;
			$('#roundPotValue').val(rPot);
			console.log("player checks")
			playerTurn();
	}else console.log("cant chec");



}
function makeBet(){
	
	if (player===1){
		playerOneBank= playerOneBank-parseInt($("#bet-input").val(),10);
			$('#playerOneBankVal').val(playerOneBank);
			rPot=rPot+ parseInt($("#bet-input").val(),10);
			$('#roundPotValue').val(rPot);
			tPot=tPot+ parseInt($("#bet-input").val(),10);
			$('#totalPotValue').val(tPot);
			playerTurn();

		}else{
		
		playerTwoBank= playerTwoBank-parseInt($("#bet-input").val(),10);
		$('#playerTwoBankVal').val(playerTwoBank);
		rPot=rPot+ parseInt($("#bet-input").val(),10);
		$('#roundPotValue').val(rPot);
		tPot=tPot+ parseInt($("#bet-input").val(),10);
		$('#totalPotValue').val(tPot);
		
		playerTurn();

		}

	

};
function makeCall(){
	if (player===1){
			playerOneBank=playerOneBank-rPot;
		$('#playerOneBankVal').val(playerOneBank);
		rPot=rPot+ parseInt($("#bet-input").val(),10);
		$('#roundPotValue').val(rPot);
		tPot=tPot+ parseInt($("#bet-input").val(),10);
		$('#totalPotValue').val(tPot);
		playerTurn();
		


		} else{
	
	playerTwoBank=playerTwoBank-rPot;
		$('#playerTwoBankVal').val(playerTwoBank);
		rPot=rPot+ parseInt($("#bet-input").val(),10);
		$('#roundPotValue').val(rPot);
		tPot=tPot+ parseInt($("#bet-input").val(),10);
		$('#totalPotValue').val(tPot);
		playerTurn();

			}
rPot=0;
$('#roundPotValue').val(0);
};
function makeBank(){
	$('#roundPotValue').val(rPot);
	$('#totalPotValue').val(tPot);
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
				var newDeck= deck.push({
					suit:suits[j],
					rank:ranks[k]
				})
			
		
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
    $("#playerOneHand").append('<img src=assets/' + playerOne[0].suit+playerOne[0].rank + ".png>");
    playerTwo.push(deck.shift());
    $("#playerTwoHand").append('<img src=assets/' + playerTwo[0].suit+playerTwo[0].rank + ".png>");
    playerOne.push(deck.shift());
    $("#playerOneHand").append('<img src=assets/' + playerOne[1].suit+playerOne[1].rank + ".png>");
    playerTwo.push(deck.shift());
    $("#playerTwoHand").append('<img src=assets/' + playerTwo[1].suit+playerTwo[1].rank + ".png>");
 	} else
    return null;
}

function dealFlop(){
	if (deck.length > 0){
	burnBoard.push(deck.shift());
	$("#burnBoardDisp").append('<img src=assets/' + burnBoard[0].suit+burnBoard[0].rank + ".png>");
	board.push(deck.shift());
	$("#boardDisp").append('<img src=assets/' + board[0].suit+board[0].rank + ".png>");
	board.push(deck.shift());
	$("#boardDisp").append('<img src=assets/' + board[1].suit+board[1].rank + ".png>");
	board.push(deck.shift());
	$("#boardDisp").append('<img src=assets/' + board[2].suit+board[2].rank + ".png>");
	} else
	return null;
}

function dealTurn(){
	if (deck.length >0){
		burnBoard.push(deck.shift());
		$("#burnBoardDisp").append('<img src=assets/' + burnBoard[1].suit+burnBoard[1].rank + ".png>");
		board.push(deck.shift());
		$("#boardDisp").append('<img src=assets/' + board[3].suit+board[3].rank + ".png>");
	} else
	return null;
}
function dealRiver(){
	if (deck.length >0){
		burnBoard.push(deck.shift());
		$("#burnBoardDisp").append('<img src=assets/' + burnBoard[2].suit+burnBoard[2].rank + ".png>");
		board.push(deck.shift());
		$("#boardDisp").append('<img src=assets/' + board[4].suit+board[4].rank + ".png>");
	} else
	return null;
}

function imageReference(){
	return playerOne[0].suit+playerOne[0].rank
}

