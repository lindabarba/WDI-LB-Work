console.log("JS file is connected to HTML! Woo!")
// declare card variables and assign values
var cardOne = "queen";
var cardTwo = "queen";
var cardThree = "king";
var cardFour = "king";
// assignment testing card matching
//if (cardTwo === cardFour) {
//	alert("You found a match!");
//} else if (cardTwo !== cardFour) {
//	alert("Sorry, try again.");
//}
// - create game board lesson 10.6 step 5
var gameBoard = document.getElementById('game-board');
// - create cards for board lesson 10.6 step 6
function createCards () {
// tried this code:
//	for (var i = 0; i < 4; i++) {
//  	var newCard = document.createElement('div').className = 'card';
//  	document.getElementById('game-board')[i].appendChild(newCard);
//		}
	for (var i=0; i<cards.length; i++) {
		var newCard = document.createElement('div');
		newCard.className = 'card';
		gameBoard.appendChild(newCard);
		//exercise 11.6 lines - WRONG PLACE? = add cards to board
		//cardElement.setAttribute('data-card', cards[i]);
		//cardElement.addEventListener('click', isTwoCards);
	}
}
//create cards - Lesson 11.6 step 1
var cards = ['queen', 'queen', 'king', 'king'];
// empty variable for potential cards in play - Lesson 11.6 step 2
var cardsInPlay = [];

// create game board lesson 11.6 step 3
function createBoard() {
	for (var i=0; i<cards.length; i++) {
		cards.setAttribute('data-card', cards[i]);
		cards.addEventListener('click', isTwoCards);
//		cardElement.setAttribute('data-card', cards[i]);
//		cardElement.addEventListener('click', isTwoCards);
	}
}
// test if two cards in play are a match
function isMatch(cards) {
	if (cards[0] === cards[1]) {
		alert("You found a match!");
	}	else (cards[0] !== cards[1]) {
			alert("Sorry, try again.");
		}
	}
// test to see if there are cards in play lesson 11.6 step 6
function isTwoCards() {
	//add card to array of cards in play
	cardsInPlay.push(this.getAttribute('data-card'));
	//set card image lesson 11.6 step 7
	if (cardsInPlay.push(this.getAttribute('data-card')) === 'queen') {
		cardsInPlay.innerHTML = '<img src="Card-Queen.png" alt="Queen of Hearts" />';
		else cardsInPlay.innerHTML = 'img src="Card-King.png" alt="King of Hearts" />';
	}
	//PSEUDO CODE:
	//if (cardsInPlay.push(this.getAttribute('data-card')) = 'queen')
	//cardsInPlay.getAttribute('data-card').innerHTML = '<img src="Card-King.png" alt="King of Hearts" />';		
	//END

	//if two cards in play check for match
	if (cardsInPlay.length === 2) {
		//check against isMatch
		isMatch(cardsInPlay);
		//clear board
		cardsInPlay = [];
	}

}
