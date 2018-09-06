let card = document.getElementsByClassName("contentcard__cards");
let firstCard = null
let secondCard = null
// let cardsList = require('./cards.js')

function disable() {
    if (firstCard != null && secondCard != null) {
        if (firstCard.dataset.card == secondCard.dataset.card) {
            firstCard.removeEventListener("click", flip);
            firstCard.classList.add("contentcard__cards--disabled")
            secondCard.removeEventListener("click", flip);
            secondCard.classList.add("contentcard__cards--disabled")
            clearSelectedCards();
        } else {
            setTimeout(unflip, 1000);
        }
    }
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
    disable();
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