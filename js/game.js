let card = document.getElementsByClassName("contentcard__cards");
let firstCard = null
let secondCard = null
let scoreGeneral = 0
let activePlayer = 1
let player1 = {
    description: 'Player 1',
    rounds: 0,
    score: 0
}
let player2 = {
    description: 'Player 2',
    rounds: 0,
    score: 0,
}
let winner = ""
// let cardsList = require('./cards.js')

function checkForMatch(player) {
    if (firstCard != null && secondCard != null) {
        if (firstCard.dataset.card == secondCard.dataset.card) {
            disableCards()
            scoreGeneral++
            player.score++
            clearSelectedCards();
        } else {
            setTimeout(unflip, 1000);
        }
        player.rounds++
        changePlayer()
    }
    document.getElementById("roundsplayer1").innerHTML = "Jogadas Player 1: " + player1.rounds;
    document.getElementById("roundsplayer2").innerHTML = "Jogadas Player 2: " + player2.rounds;
    document.getElementById("scoreplayer1").innerHTML = "Acertos Player 1: " + player1.score;
    document.getElementById("scoreplayer2").innerHTML = "Acertos Player 2: " + player2.score;
    console.log(player.description, player);
    checkWinner()
}

function checkWinner() {
    if (scoreGeneral == (card.length / 2)) {
        if (player1.score > player2.score) {
            winner = player1.description
        } else if (player2.score > player1.score) {
            winner = player2.description
        } else {
            winner = "Empate"
        }
        document.getElementById("winner").innerHTML = "Ganhador: " + winner;

    }
}
function newGame() {
    location.reload()
}

function disableCards() {
    firstCard.removeEventListener("click", flip);
    firstCard.classList.add("contentcard__cards--disabled")
    secondCard.removeEventListener("click", flip);
    secondCard.classList.add("contentcard__cards--disabled")
}

function clearSelectedCards() {
    firstCard = null;
    secondCard = null;
}

function flip() {
    if (firstCard == null) {
        firstCard = this;
    } else {
        if (this == firstCard) {
            return
        }
        secondCard = this;
    }
    this.classList.toggle("card--flip");

    if (activePlayer == 1) {
        checkForMatch(player1);
    } else if (activePlayer == 2) {
        checkForMatch(player2);
    }
}

function unflip() {
    firstCard.classList.toggle("card--flip");
    secondCard.classList.toggle("card--flip");
    clearSelectedCards();
}

for (let i = 0; i < card.length; i++) {
    card[i].addEventListener("click", flip);
}

function random() {
    for (let i = 0; i < card.length; i++) {
        card[i].style.order = Math.floor((Math.random() * card.length));
    }
}
random()

function changePlayer() {
    if (activePlayer == 1) {
        activePlayer = 2
    } else {
        activePlayer = 1
    }
}