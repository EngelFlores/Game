// import {cardsList} from './cards.js';
const cardsList = [
    {
        image: "images/051-bulldog.png",
        cardTitle: "The Bulldog",
        cardIdentifier: "bulldog",
    },
    {
        image: "images/doubt.png",
        cardTitle: "The Doubt",
        cardIdentifier: "doubt",
    },
    {
        image: "images/051-chameleon.png",
        cardTitle: "The Chameleon",
        cardIdentifier: "chameleon",
    },
    {
        image: "images/051-cow.png",
        cardTitle: "Cow",
        cardIdentifier: "cow",
    },
    {
        image: "images/051-hippopotamus.png",
        cardTitle: "Hippopotamus",
        cardIdentifier: "hippopotamus",
    },
    {
        image: "images/051-monkey.png",
        cardTitle: "Monkey",
        cardIdentifier: "monkey",
    },
    {
        image: "images/051-octopus.png",
        cardTitle: "Octopus",
        cardIdentifier: "octopus",
    },
    {
        image: "images/051-panda.png",
        cardTitle: "Panda",
        cardIdentifier: "panda",
    },
    {
        image: "images/051-pelican.png",
        cardTitle: "Pelican",
        cardIdentifier: "pelican",
    },
    {
        image: "images/051-penguin.png",
        cardTitle: "penguin",
        cardIdentifier: "penguin",
    },
    {
        image: "images/051-siberian-husky.png",
        cardTitle: "Husky",
        cardIdentifier: "husky",
    },
    {
        image: "images/051-sloth.png",
        cardTitle: "Sloth",
        cardIdentifier: "sloth",
    },
    {
        image: "images/051-tiger.png",
        cardTitle: "Tiger",
        cardIdentifier: "tiger",
    },
    {
        image: "images/051-toucan.png",
        cardTitle: "Toucan",
        cardIdentifier: "toucan",
        backgroundColor: "Blue"
    },
    {
        image: "images/051-turtle.png",
        cardTitle: "Turtle",
        cardIdentifier: "turtle",
    },
    {
        image: "images/pikachu.png",
        cardTitle: "Pikachu",
        cardIdentifier: "pikachu",
    },
    {
        image: "images/051-bat.png",
        cardTitle: "Bat",
        cardIdentifier: "bat",
    },
    {
        image: "images/051-beaver.png",
        cardTitle: "Beaver",
        cardIdentifier: "beaver",
    },
    {
        image: "images/051-bee.png",
        cardTitle: "Bee",
        cardIdentifier: "bee",
    },
    {
        image: "images/051-beetle.png",
        cardTitle: "Beetle",
        cardIdentifier: "beetle",
    },
    {
        image: "images/051-camel.png",
        cardTitle: "Camel",
        cardIdentifier: "camel",
    },
    {
        image: "images/051-canary.png",
        cardTitle: "Canary",
        cardIdentifier: "canary",
    },
    {
        image: "images/051-cat.png",
        cardTitle: "Cat",
        cardIdentifier: "cat",
    },
    {
        image: "images/051-chicken.png",
        cardTitle: "Chicken",
        cardIdentifier: "chicken",
    },
    {
        image: "images/051-clown-fish.png",
        cardTitle: "Fish",
        cardIdentifier: "fish",
    },
    {
        image: "images/051-cobra.png",
        cardTitle: "Cobra",
        cardIdentifier: "cobra",
    },
    {
        image: "images/051-crab.png",
        cardTitle: "Crab",
        cardIdentifier: "crab",
    },
    {
        image: "images/051-frog.png",
        cardTitle: "Frog",
        cardIdentifier: "frog",
    },
    {
        image: "images/051-duck.png",
        cardTitle: "Duck",
        cardIdentifier: "duck",
    },
    {
        image: "images/051-fox.png",
        cardTitle: "Fox",
        cardIdentifier: "fox",
    },
    {
        image: "images/051-frog.png",
        cardTitle: "Frog",
        cardIdentifier: "frog",
    }
];
const player1Info = document.getElementById("scoreboard__player1");
const player2Info = document.getElementById("scoreboard__player2");
const card = document.getElementsByClassName("contentcard__cards");
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

for (let i = 0; i < card.length; i++) {
    card[i].addEventListener("click", flip);
}

(function random() {
    for (let i = 0; i < card.length; i++) {
        card[i].style.order = Math.floor((Math.random() * card.length));
    }
})()

function changePlayer() {
    if (activePlayer == 1) {
        activePlayer = 2
    } else {
        activePlayer = 1
    }
}

function cardBuilder(cardsList) {
    let contentcard = document.createElement("div");
    let contentcard__cards = document.createElement("div");
    let contentcard__cards__img = document.createElement("img");
    contentcard.appendChild(contentcard__cards);
    contentcard__cards.appendChild(contentcard__cards__img.classList)
    contentcard.classList.add("contentcard")
    contentcard__cards.classList.add("contentcard__cards")
    contentcard__cards__img.classList.add("contentcard__cards__img")
}


// function addElement() {
//     // create a new div element 
//     var newDiv = document.createElement("div");
//     // and give it some content 
//     var newContent = document.createTextNode("Hi there and greetings!");
//     // add the text node to the newly created div
//     newDiv.appendChild(newContent);

//     // add the newly created element and its content into the DOM 
//     var currentDiv = document.getElementById("div1");
//     document.body.insertBefore(newDiv, currentDiv);
// }

// secondCard.classList.add("contentcard__cards--disabled")