const player1Info = document.getElementById("scoreboard__player1")
const player2Info = document.getElementById("scoreboard__player2")
const memoryGameBoard = document.getElementById("memory-game")
let cards;
let firstCard = null
let secondCard = null
let scoreGeneral = 0
let activePlayer = 1
let hasCards = false;
let levelForm = getLevelGame("level");
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
    document.getElementById("roundsplayer1").innerHTML = "Rodadas: " + player1.rounds;
    document.getElementById("roundsplayer2").innerHTML = "Rodadas: " + player2.rounds;
    document.getElementById("scoreplayer1").innerHTML = "Acertos: " + player1.score;
    document.getElementById("scoreplayer2").innerHTML = "Acertos: " + player2.score;
    checkWinner()
}

function checkWinner() {
    if (scoreGeneral == (cards.length / 2)) {
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
    window.location.href = "./level.html";
}

function disableCards() {
    firstCard.removeEventListener("click", flip);
    firstCard.classList.add("contentcard__cards--disabled")
    secondCard.removeEventListener("click", flip);
    secondCard.classList.add("contentcard__cards--disabled")
}

function clearSelectedCards() {
    firstCard = null
    secondCard = null
    hasCards = false
}

function flip() {
    if (hasCards) return

    if (firstCard == null) {
        firstCard = this
    } else {
        if (this == firstCard) {
            return
        }
        secondCard = this
        hasCards = true
    }
    this.classList.toggle("card--flip");

    if (activePlayer == 1) {
        checkForMatch(player1);
        operativePlayer()
    } else if (activePlayer == 2) {
        checkForMatch(player2);
        inoperativePlayer()
    }
}
function operativePlayer() {
    player1Info.style.backgroundColor = "#F5DEB3";
    player2Info.style.backgroundColor = "#DCDCDC";
}
function inoperativePlayer() {
    player1Info.style.backgroundColor = "#DCDCDC";
    player2Info.style.backgroundColor = "#F5DEB3";
}

function unflip() {
    firstCard.classList.toggle("card--flip");
    secondCard.classList.toggle("card--flip");
    clearSelectedCards();
}

function randomizeCards() {
    cards = document.getElementsByClassName("contentcard__cards")
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.order = Math.floor((Math.random() * cards.length));
    }
}

function randomCards() {
    let randomNumber = Math.floor((Math.random() * (cardsList.length / 2 + 1)))
    let level = parseLevelForm();
    let newCardsList = cardsList.splice(randomNumber, level)
    let duplicatedCards = newCardsList.map(function (item) {
        return [item, item];
    }).reduce(function (newCardsList, b) { return newCardsList.concat(b) })
    
    duplicatedCards.forEach(createCard)
}
randomCards()
randomizeCards()

function createCard (card) {
    let generatedCard = cardBuilder(card);
    generatedCard.addEventListener("click", flip);
    memoryGameBoard.appendChild(generatedCard)
}

function getLevelGame(levelGame) {
    let query = window.location.search.substring(1);
    let pair = query.split("=");
    return pair[0] == levelGame ? pair[1] : false
}

function parseLevelForm() {
    return parseInt(levelForm);
}

function changePlayer() {
    activePlayer = (activePlayer == 1) ? 2 : 1;
}

function cardBuilder(card) {

    let newCard = document.createElement("div");
    newCard.className = 'contentcard__cards'
    newCard.dataset.card = card.cardIdentifier

    let front = document.createElement("img");
    front.src = "images/doubt.png"
    front.className = 'contentcard__cards__img contentcard__cards--front'
    newCard.appendChild(front)

    let back = document.createElement("img");
    back.src = card.image
    back.className = 'contentcard__cards__img contentcard__cards--back'
    newCard.appendChild(back)

    return newCard

}
