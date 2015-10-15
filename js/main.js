console.log("js loaded");

///Globals

//Deck variables
var ranks = new Array ("02", "03", "04", "05", "06","07","08","09","10","11","12","13","14");
var suits = new Array ("c", "d", "h", "s");
var deck = [];


//Board variables
var playerOne = [];
var playerTwo = [];/// cards are objects
var board = [];
var burnBoard = [];

//Betting functions
var playerOneBank = 100000;
var playerTwoBank = 100000;
var tPot = 0;//total pot
var rPot= 0;//round pot = goes to 0 after each round


var player = 1;//turn function
var turnCount = 0;//tracks turn count
var handVal = 0;

//winning logic arrays
var rankEval = []//sorts 
var suiteEval = [];

var cardEval1 = [];//evaluates possible hands for p1
var cardEval2 = [];//evaluates possible hands for p2
//evaluators
var checkRank1 = [];//sorts smallest to largest
var checkSuit1 = [];//sorts suits
var checkID1 = [];//sorts id ---(for royalflush or straightflush)
var checkRank2 = [];//
var checkSuit2 = [];//same as above except for player 2
var checkID2 = [];//

//single High card function//
var parseRank1 = [];//parse numbers of rank (- the 0)
var parseRank2 = [];
var highCard1 = 0;
var highCard2 = 0;
//flush suite count functions
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
function handEval(){//sorts into hand evaluate array
cardEval1=$.merge( $.merge( [], playerOne ), board );
cardEval2=$.merge( $.merge( [], playerTwo ), board );
sortHand();
}


function sortHand(){//automattically sorts into 3 arrays for rank suite and id#

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
function noRepeat(x) {//cardRank no repeats
  var i, l = x.length, result = [];
  for (i = 0; i < l; i++) {
    if (result[result.length - 1] != x[i]) {
      result.push(x[i]);
    }
  }
  return result;
}
function noDupes(){
	noRepeat(checkRank1);
	noRepeat(checkRank2);
}
function straight(){//return if player has straight

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

//flush functions
function flush() {
	checkSuits();
	checkFlush();
}
function checkSuits(){//sorts suits into different variables
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
function checkFlush(){//logs who has flush
	if (clovers1>=5 || diamonds1>=5 || hearts1>=5 || diamonds1>=5){
		console.log("player1 flush");
	}if (clovers2>=5 || diamonds2>=5 || hearts2>=5 || diamonds2>=5){
		console.log("player2 flush");
	}
}
//Single Value functions
function noZero1(){
	for (i=0; i<checkRank1.length; i++){
		parseRank1.push(parseInt((checkRank1[i]))) ///////Take out 0s in the values.
	}
}
function noZero2(){
	for (i=0; i<checkRank2.length; i++){
		parseRank2.push(parseInt((checkRank2[i])))
	}
}
function noZero(){
	noZero1();
	noZero2();
}


function LargestNum1(){
highCard1=0;

for (i=0; i<=highCard1;i++){
    if (parseRank1[i]>highCard1) {
        var highCard1=parseRank1[i];
      
    } 

 
} return highCard1;
}

function LargestNum2(){
highCard2=0;

	for (i=0;i<=highCard2;i++){
		if (parseRank2[i]>highCard2){
			var highCard2=parseRank2[i];
			
		}
	} return highCard2;
}

function winSingle(){
	if (LargestNum1()==LargestNum2()){
		console.log("tie");
	}if (LargestNum1()>LargestNum2()){
        console.log("player 1 wins w"+" "+ LargestNum1())
} if (LargestNum2()>LargestNum1()){
       console.log("player 2 wins w"+ " " + LargestNum2());  
}
}

