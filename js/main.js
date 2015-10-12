console.log("js loaded");
///Globals
var ranks = new Array ("01", "02", "03", "04", "05", "06","07","08","09","10","11","12","13");
var suits = new Array ("c", "d", "h", "s");
var deck = new Array ();
var playerOne = new Array ();
var playerTwo = new Array ();
var board = new Array ()
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
    for (j = 0; j < this.deck.length; j++) {
      k = Math.floor(Math.random() * this.deck.length);
      temp = this.deck[j];
      this.deck[j] = this.deck[k];
      this.deck[k] = temp;
    }
}

function deal() {

  if (this.deck.length > 0)
    return this.deck.shift();
  else
    return null;
}