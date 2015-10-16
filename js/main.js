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
var p1HandScores= [];
var p2HandScores= [];
//single High card function//
var parseRank1 = [];//parse numbers of rank (- the 0)
var parseRank2 = [];
var highCard1 = 0;
var highCard2 = 0;

//pairs-trips-fullhouse//
var pairs1=0;
var pairs2=0;
var trips1=0;
var trips2=0;

//flush suite count functions
var hearts1= 0;
var spades1= 0 ;
var clovers1= 0;
var diamonds1= 0;
var hearts2= 0;
var spades2= 0 ;
var clovers2= 0;
var diamonds2= 0;



/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
///Bet functions
function playerTurn(){ ////Determines who's move

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

function makeBet(){ ////Make a bet
	
	if (player===1){
		var current=playerOneBank;
		var Icurrent="#playerOneBankVal";

	}else{ var current=playerTwoBank;
		   var Icurrent="#playerTwoBankVal";}

		current= current-parseInt($("#bet-input").val(),10);
		$(Icurrent).val(current);
		rPot=rPot+ parseInt($("#bet-input").val(),10);
		$('#roundPotValue').val(rPot);
		tPot=tPot+ parseInt($("#bet-input").val(),10);
		$('#totalPotValue').val(tPot);
		playerTurn();

		}

	



function makeCall(){  ///Call the Bet
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


function makeBank(){  ///Links pot values to Div display

	$('#roundPotValue').val(rPot);
	$('#totalPotValue').val(tPot);
	$('#playerOneBankVal').val(playerOneBank);
	$('#playerTwoBankVal').val(playerTwoBank);
}


/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
///Deck functions
function deckId(){

	for (i=0; i<=51;i++)
		deck[i].id=i
}

function makeDeck(m){///create deck

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
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
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
	} 
}

function dealTurn(){

	if (deck.length >0){
		burnBoard.push(deck.shift());
		$("#burnBoardDisp").append('<img src=assets/backcard.jpg>');
		board.push(deck.shift());
		$("#boardDisp").append('<img src=assets/' + board[3].suit+board[3].rank + ".png>");
	} 

}
function dealRiver(){

	if (deck.length >0){
		burnBoard.push(deck.shift());
		$("#burnBoardDisp").append('<img src=assets/backcard.jpg>');
		board.push(deck.shift());
		$("#boardDisp").append('<img src=assets/' + board[4].suit+board[4].rank + ".png>");
	} 
		handEval();
		winStack();
		chickenDinner();

}

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
///winconditions


function handEval(){//sorts into hand evaluate array

	cardEval1=$.merge( $.merge( [], playerOne ), board );
	cardEval2=$.merge( $.merge( [], playerTwo ), board );
	sortHand();
	console.log("checking for winner...")
	}


function sortHand(){//automatically sorts into 3 arrays for rank suite and id#

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


function winStack(){
	noZero1();
	noZero2();
	straight();
	checkSuits();
	checkFlush();
	checkMulti();
	highestPair();
	checkSingle();

}
function checkWinningHands(x){
	for(i=0;i<=p1HandScores.length;i++){
		if(x===1){
			$('#Hands').html("High Card");
		}if (x===3){
			$('#Hands').html("2 pairs");
		}if (x===4){
			$('#Hands').html("Trips");
		}if (x===5){
			$('#Hands').html("Straight");
		}if (x===6){
			$('#Hands').html("Flush");
		}if (x===7){
			$('#Hands').html("Full House");
		}if (x===8){
			$('#Hands').html("4 of a Kind");
		}if (x===9){
			$('#Hands').html("Straight Flush");
		}if (x===10){
			$('#Hands').html("Royal Flush");
		}
		}
	}
function chickenDinner(){

	var p1Max = Math.max.apply(null,p1HandScores);
	var p2Max = Math.max.apply(null,p2HandScores);

	if (p1Max > p2Max){
		$('#Winner').html("player1 Wins");
		checkWinningHands(p1Max);
	}
	else if(Math.max.apply(null,p1HandScores)===Math.max.apply(null,p2HandScores)){
		$('#Winner').html("split pot");
		checkWinningHands(p1Max)+checkWinningHands(p2Max)
	}	
	else {$('#Winner').html("player2 Wins");
		checkWinningHands(p2Max);}
	}
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
///STRAIGHT FUNCTINONS
function noRepeat(x) {//Remove repeating values in Rank 1+2 array. (for)

  var i, l = x.length, result = [];
  for (i = 0; i < l; i++) {
    if (result[result.length - 1] != x[i]) {
      result.push(x[i]);
    }
  }
  return result;
}
function noDupes(){//no repeats for straight function

	noRepeat(checkRank1);
	noRepeat(checkRank2);
}
function straight(){//return if player has straight

		var reCheck1=noRepeat(parseRank1);
		var reCheck2=noRepeat(parseRank2);
			for(i=0; i<=2; i++){
				if (reCheck1[i] == reCheck1[i+1]-1 
				&& reCheck1[i+1]-1 == reCheck1[i+2]-2
				&& reCheck1[i+2]-2 == reCheck1[i+3]-3
				&& reCheck1[i+3]-3 == reCheck1[i+4]-4){
				
				p1HandScores.push(5);

			}
			if((reCheck2[i] == reCheck2[i+1]-1 
				&& reCheck2[i+1]-1 == reCheck2[i+2]-2
				&& reCheck2[i+2]-2 == reCheck2[i+3]-3
				&&	reCheck2[i+3]-3 == reCheck2[i+4]-4)){
					
				p2HandScores.push(5);
}
}
}
function straightF(){//straight flushes

	for(i=0; i<=checkID1.length; i++)
	if (checkID1[i] == checkID1[i+1]-1 
		&& checkID1[i+1]-1 == checkID1[i+2]-2
		&& checkID1[i+2]-2 == checkID1[i+3]-3
		&& checkID1[i+3]-3 == checkID1[i+4]-4){

		p2HandScores.push(9);
	}else if((checkID2[i] == checkID2[i+1]-1 
		&& checkID2[i+1]-1 == checkID2[i+2]-2
		&& checkID2[i+2]-2 == checkID2[i+3]-3
		&&	checkID2[i+3]-3 == checkID2[i+4]-4)){
		
		p1HandScores.push(9);}
}

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
//flush functions
function flush() {
	checkSuits();
	checkFlush();
}
function checkSuits(){
//sorts suits into different variables

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
	
		p1HandScores.push(6);

	}if (clovers2>=5 || diamonds2>=5 || hearts2>=5 || diamonds2>=5){
	
		p2HandScores.push(6);
	}
}
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
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


function LargestNum1(){///Largest number from player 1 hand
highCard1=0;

for (i=0; i<=highCard1;i++){
    if (parseRank1[i]>highCard1) {
        var highCard1=parseRank1[i];
      
    } 

 
} return highCard1;
}

function LargestNum2(){///Largest number from player 2 hand
highCard2=0;

	for (i=0;i<=highCard2;i++){
		if (parseRank2[i]>highCard2){
			var highCard2=parseRank2[i];
			
		}
	} return highCard2;
}

function checkSingle(){///Determine high-card winner


	if (LargestNum1()==LargestNum2()){

	}if (LargestNum1()>LargestNum2()){

p1HandScores.push(1);

} if (LargestNum2()>LargestNum1()){

p2HandScores.push(1);

}
}
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
///Pairs///Trips//Fullhouse


function pair1() {//frequency of numbers in hand 1
	var counts1 = {},
	    num;

	for(var i = 0; i< parseRank1.length; i++) {
	    num = parseRank1[i];
	    counts1[num] = counts1[num] ? counts1[num]+1 : 1;
	}
	return counts1;
}

function pair2() {///^^^^
	var counts2 = {},
	    num;

	for(var i = 0; i< parseRank2.length; i++) {
	    num = parseRank2[i];
	    counts2[num] = counts2[num] ? counts2[num]+1 : 1;

	}
	return counts2;
}

function findMax(theObj) {
	var max = 0,
        maxKey;

	for(var k in theObj) {
		if (theObj[k] > max) {
			max = theObj[k];
            maxKey = k;
		}
	}		
	return maxKey;
}

function highestPair(){
	var highPair1=findMax(pair1());
	var highPair2=findMax(pair2());
	if(parseInt(highPair1)>parseInt(highPair2)){

		p1HandScores.push(2);
		$('#Hands').html("PlayerOne HighPair");

	}if(parseInt(highPair1)<parseInt(highPair2)){

		p2HandScores.push(2);
		$('#Hands').html("PlayerTwo HighPair");
	}
}

function checkMulti(){//evaluates for pairs,trips,twopairs,&fullhouses fckyea

	counts1=pair1();
	counts2=pair2();
	var pairCount1=0;
	var pairCount2=0;
	for (i=0; i<=14;i++){
		
		if (counts1[i]===2){
        pairCount1++;

		} if (counts1[i]===3){
		p1HandScores.push(4);

		} if( pairCount1 >1 ) {
        p1HandScores.push(3);

		} if (counts1[i]===3 && pairCount1 ===1){
		p1HandScores.push(7);

		} if (counts1[i]===4){

		p1HandScores.push(8);
		}

	} for (i=0; i<=14; i++){

		if (counts2[i]===2){
             pairCount2++;

		} if (counts2[i]===3){
			p2HandScores.push(4)

		} if (pairCount2 >1){
			p2HandScores.push(3);

		} if (counts2[i]===3 && pairCount2 ===1){
			p2HandScores.push(7);

		} if (counts2[i]===4){
			p2HandScores.push(8);

		}
	}
}	


