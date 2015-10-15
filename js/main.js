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
var handVal = 0;
var cardEval1 = [];
var cardEval2 = [];
var checkRank1 = [];
var checkSuit1 = [];
var checkID1 = [];
var checkRank2 = [];
var checkSuit2 = [];
var checkID2 = [];
var hearts1= 0;
var spades1= 0 ;
var clovers1= 0;
var diamonds1= 0;
var hearts2= 0;
var spades2= 0 ;
var clovers2= 0;
var diamonds2= 0;
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
function deckId(){
	for (i=0; i<=51;i++)
		deck[i].id=i
}

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
	deckId();
	makeBank();
}
function deckId(){
	for (i=0; i<=51;i++)
		deck[i].id=i
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
	$("#burnBoardDisp").append('<img src=assets/backcard.jpg>');
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
		$("#burnBoardDisp").append('<img src=assets/backcard.jpg>');
		board.push(deck.shift());
		$("#boardDisp").append('<img src=assets/' + board[3].suit+board[3].rank + ".png>");
	} else
	return null;
}
function dealRiver(){
	if (deck.length >0){
		burnBoard.push(deck.shift());
		$("#burnBoardDisp").append('<img src=assets/backcard.jpg>');
		board.push(deck.shift());
		$("#boardDisp").append('<img src=assets/' + board[4].suit+board[4].rank + ".png>");
	} else
	return null;
	handEval();
}


///winconditions
function handEval(){
cardEval1=$.merge( $.merge( [], playerOne ), board );
cardEval2=$.merge( $.merge( [], playerTwo ), board );
}

function flush(x) {
	var x;
    var count = 0;
    for (var i = 0; i < x.length; i++) {
        if (cardEval1[i].suit === "c") {
            count++;
        }

    }
    return count;
}

function sortHand(){

	for (var i = 0 ; i<cardEval1.length; i++){
		checkSuit1.push(cardEval1[i].suit);
		checkSuit1.sort()
		checkRank1.push(cardEval1[i].rank); 
		checkRank1.sort() 
        checkID1.push(cardEval1[i].id); 
        checkID1.sort()
        checkSuit2.push(cardEval2[i].suit);
        checkSuit2.sort()
		checkRank2.push(cardEval2[i].rank);  
		checkRank2.sort()
        checkID2.push(cardEval2[i].id); 
        checkID2.sort()
 	}
}
function noRepeat(x) {
  var i, l = x.length, result = [];
  for (i = 0; i < l; i++) {
    if (result[result.length - 1] != x[i]) {
      result.push(x[i]);
    }
  }
  return result;
}
function straight(){
	for(i=0; i<=2; i++)
	if(checkRank2[i] == checkRank2[i+1]-1 && checkRank2[i+1]-1 == checkRank2[i+2]-2&& checkRank2[i+2]-2 == checkRank2[i+3]-3&&	checkRank2[i+3]-3 == checkRank2[i+4]-4)
		console.log("player2 has straight");
	else if((checkRank1[i] == checkRank1[i+1]-1 
		&& checkRank1[i+1]-1 == checkRank1[i+2]-2
		&& checkRank1[i+2]-2 == checkRank1[i+3]-3
		&&	checkRank1[i+3]-3 == checkRank1[i+4]-3))
		console.log("player1 has straight");
	else console.log("no straight");
}
function checkSuits(){
	for (i=0; i<checkSuit1.length; i++){
		if (checkSuit1[i] === "c"){
			clovers1 ++;
		} if (checkSuit1[i] === "d"){
			diamonds1 ++;
		} if (checkSuit1[i] === "h") {
			hearts1 ++;
		} if (checkSuit1[i] === "s") {
			spades1 ++;
		} if (checkSuit2[i]==="c"){
		    clovers2 ++;
		} if (checkSuit2[i]==="d"){
		    diamonds2 ++;
		} if (checkSuit2[i]==="h"){
		    hearts2 ++;
		} if (checkSuit2[i]==="s"){
		    spades2++;
		}
	}
}
function checkFlush(){
	if (clovers1===5 || diamonds1===5 || hearts1===5 || diamonds1===5){
		console.log("player1 flush");
	}if (clovers2===5 || diamonds2===5 || hearts2===5 || diamonds2===5){
		console.log("player2 flush");
	}
}
