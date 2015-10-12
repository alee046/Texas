console.log("js loaded");
var ranks = new Array ("01", "02", "03", "04", "05", "06","07","08","09","10","11","12","13");
var suits = new Array ("c", "d", "h", "s");
var cards = new
function makeDeck(m){

	var j, k;
	var m;
  	m = ranks.length * suits.length;
		for (j = 0; j< suits.length; j++)
			for (k = 0; k<ranks.length; k++){
				var newDeck= cards.push(suits[j]+ranks[k])
			
		
	};
}
function stackShuffle(n) {

  var i, j, k;
  var temp;

  // Shuffle the stack 'n' times.

  for (i = 0; i < n; i++)
    for (j = 0; j < this.cards.length; j++) {
      k = Math.floor(Math.random() * this.cards.length);
      temp = this.cards[j];
      this.cards[j] = this.cards[k];
      this.cards[k] = temp;
    }
}