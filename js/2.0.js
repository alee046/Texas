var ranks = [2,3,4,5,6,7,8,9,10,11,12,13,14];
var suits = ["c", "d", "h", "s"];
var deck = [];
var players= [];

var table = {
  deck: deck,
  boardCards: [],
  burnBoard: [],
  pot: 0
};

function setPlayers(){

  for (i=0; i<6; i++){
    players.push({
      player : i+1,
      hand : [],
      bank : 1000000
    });
  }
}

function deckID(){
  for (i=0; i<=51;i++)
    deck[i].id=i;
}

function shuffle(n) {

  n=(Math.random()*100)
  var i, j, k;
  var temp;
  // Shuffle the stack 'n' times.
  for (i = 0; i < n; i++){
    for (j = 0; j < deck.length; j++) {
      k = Math.floor(Math.random() * deck.length);
      temp = deck[j];
      deck[j] = deck[k];
      deck[k] = temp;
    }
  }
}

function makeDeck(){

  var j, k;
    for (j = 0; j< suits.length; j++){
      for (k = 0; k<ranks.length; k++){
        var newDeck= deck.push({
          suit:suits[j],
          rank:ranks[k]
        });
      }
    }
  deckID();
  shuffle();
}

function dealHands( ) {
    for (i=0; i < players.length; i++){
      players[i].hand.push(table.deck.shift())
      players[i].hand.push(table.deck.shift())
          }
}
setPlayers();
makeDeck();
dealHands();
console.log(table);
console.log(players);
