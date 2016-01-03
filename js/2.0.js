////////////////////////////////////////////////////////////
//*Initial Variables//////////////////////////////////////
var ranks = [2,3,4,5,6,7,8,9,10,11,12,13,14];
var suits = ["c", "d", "h", "s"];
var table = {
  deck: [],
  boardCards: [],
  burnBoard: [],
  pot: 0
};
var players = [];

////////////////////////////////////////////////////////////
//*Initialize Game Functions//////////////////////////////////////

function setPlayers(){

  for (i=0; i<7; i++){
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
//*Dealing Functions//////////////////////////////////////
function dealHands( ) {
  k = 0;
    while (k<2){
      for (i=0; i < players.length; i++){
        players[i].hand.push(table.deck.shift());
      }
    k++;
  }
}

function burnCard(){
  table.burnBoard.push(table.deck.shift());

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

function sort(){
    for(i=0;i<7; i++){
      for(k=0;k<players[i].evaluator.eval.length;k++){
        players[i].evaluator.suit.push(players[i].evaluator.eval[k].suit);
        players[i].evaluator.rank.push(players[i].evaluator.eval[k].rank);
        players[i].evaluator.id.push(players[i].evaluator.eval[k].id);
      }
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
sort();
console.log(table);
console.log(table.players);
