let card = document.getElementsByClassName("contentcard__cards");
function girar() {
   this.classList.toggle("card--flip");
}
for (let i = 0; i < card.length; i++) {
card[i].addEventListener( "click", girar);
}