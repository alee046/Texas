////////////////////////////////////////////////////////////
//*Initial Variables//////////////////////////////////////
var ranks = [2,3,4,5,6,7,8,9,10,11,12,13,14];
var suits = ["c", "d", "h", "s"];
var table = {
  deck: [],
  boardCards: [],
  burnCards: [],
  pot: 0
};
var players = [];

////////////////////////////////////////////////////////////
//*Initialize Game Functions//////////////////////////////////////

function setPlayers(){

  for (i=0; i<8; i++){
    players.push({
      player : i+1,
      hand : [],
      evaluator: {
          eval:[],
          suit:[],
          rank:[],
          id:[],
      },
      bank : 1000000,
      score : 0
    });
  }
}

function deckID(){
  for (i=0; i<=51;i++)
    table.deck[i].id=i;
}

function shuffle(n) {

  n=(Math.random()*100);
  var i, j, k;
  var temp;
  // Shuffle the stack 'n' times.
  for (i = 0; i < n; i++){
    for (j = 0; j < table.deck.length; j++) {
      k = Math.floor(Math.random() * table.deck.length);
      temp = table.deck[j];
      table.deck[j] = table.deck[k];
      table.deck[k] = temp;
    }
  }
}

function makeDeck(){

  var j, k;
    for (j = 0; j< suits.length; j++){
      for (k = 0; k<ranks.length; k++){
        var newDeck= table.deck.push({
          suit:suits[j],
          rank:ranks[k]
        });
      }
    }
  deckID();
  shuffle();
}
////////////////////////////////////////////////////////////
//* Functions//////////////////////////////////////
function renderHands(){
  for (i=0; i <players.length; i++){
    $("#player"+(i)+"Hand").append('<img src=assets/'+ players[i].hand[0].suit+ players[i].hand[0].rank + ".png>");
    $("#player"+(i)+"Hand").append('<img src=assets/'+ players[i].hand[1].suit+ players[i].hand[1].rank + ".png>");
  }
}
function renderBoard(){
  for (i=0; i<table.boardCards.length; i++){
    $("#boardDisp").append('<img src=assets/backcard.jpg>');
  }
  for (i=0; i<table.burnCards.length; i++){
    $("#burnBoardDisp").append('<img src=assets/backcard.jpg>');
  }
}
function dealHands( ) {
  k = 0;
    while (k<2){
      for (i=0; i < players.length; i++){
        players[i].hand.push(table.deck.shift());
      }
    k++;
  }
renderHands();
}


function burnCard(){
  table.burnCards.push(table.deck.shift());

}

function dealFlop(){
  for (i=0;i<3;i++){
    table.boardCards.push(table.deck.shift());
  }
}


function dealNext(){
burnCard();
table.boardCards.push(table.deck.shift());
}
////////////////////////////////////////////////////////////
//*Winlogic Functions//////////////////////////////////////

function handEval(){
    for(i=0;i<players.length;i++)
  players[i].evaluator.eval=players[i].evaluator.eval.concat(table.boardCards, players[i].hand);
}

function sortHands(){


    for(i=0; i<8; i++){
      for(k=0;k<players[i].evaluator.eval.length;k++){
        var evalArr = players[i].evaluator;
        evalArr.suit.push(evalArr.eval[k].suit);
        evalArr.rank.push(evalArr.eval[k].rank);
        evalArr.rank.sort(function(a,b) { return a - b; });
        evalArr.id.push(evalArr.eval[k].id);
        evalArr.id.sort(function(a,b) { return a - b; });
      };
    };
}


////////////straightcheck////////////

function noRepeat(rankArr) {//Remove repeating values in Rank 1+2 array. (for)

  var i, l = rankArr.length, result = [];
  for (i = 0; i < l; i++) {
    if (result[result.length - 1] != rankArr[i]) {
      result.push(rankArr[i]);
    }
  }
  return result;
}

function straight(x){
  y= noRepeat(x.evaluator.rank);
  for(i=0; i<2; i++){
    if (y[i] == y[i+1]-1 && y[i+1]-1 == y[i+2]-2
      && y[i+2]-2 == y[i+3]-3 && y[i+3]-3 == y[i+4]-4){
        x.score += 5;
        console.log(x.score + " Player" + x.player + " has a straight");
        }
  }
}


function dispHand(){
  for (i=0; i<players.length; i++){
    console.log(players[i].evaluator.id);
    console.log(players[i].evaluator.suit);
    console.log(players[i].evaluator.rank);
  }
}
setPlayers();
makeDeck();
dealHands();
dealFlop();
burnCard();
dealNext();
dealNext();
handEval();
sortHands();
dispHand();
console.log(table);
console.log(players[i]);
$( document ).ready(function() {
  renderHands();
  renderBoard();
});

