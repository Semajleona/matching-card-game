//game starts with 10 cards facing downor blank side
// player clicks on a card to view or flip to side with picture
// player the chooses a second card and image is displayed
// check if images match
// matching images stay flipped up
// if images do not match both cards flip back over
// player picks another two cards
// game goes on until all cards are matched/ 5 pairings


/*let allCards = document.querySelectorAll('.cards')

for (let i = 0; i < allCards.length; i++) {
    allCards[i].addEventListener('click', flippingCards)
}

function flippingCards() {
    
}*/
/*let playerFirstCardSelected = ' '
let playerSecondCardSelected = ' '
document.querySelector('#card1').addEventListener('click', flippingCards)
document.querySelector('#card2').addEventListener('click', flippingCards)
document.querySelector('#card3').addEventListener('click', flippingCards)
document.querySelector('#card4').addEventListener('click', flippingCards)
document.querySelector('#card5').addEventListener('click', flippingCards)
document.querySelector('#card6').addEventListener('click', flippingCards)
document.querySelector('#card7').addEventListener('click', flippingCards)
document.querySelector('#card8').addEventListener('click', flippingCards)
document.querySelector('#card9').addEventListener('click', flippingCards)
document.querySelector('#card10').addEventListener('click', flippingCards)

function flippingCards() {
    let card1 = document.querySelector('#card1').value
    playerFirstCardSelected = card1
    console.log(playerFirstCardSelected)

}


function flippingCards() {
    let card2 = document.querySelector('#card2').value
    playerSecondCardSelected = card2
    console.log(playerSecondCardSelected)

}*/


let playerFirstCardSelected = ''//storing the value = emoji
let playerSecondCardSelected = ''
let firstCardMatch = ''//storing the button thats clicked so that it can be used against the second one to compare if cards are a match or not
let secondCardMatch = ''
let matches = 0
let cards = document.querySelectorAll('.cards')

cards = Array.from(cards) // turns card into array similar to tic tac toe game 

cards.forEach(card => {
    card.addEventListener('click', () => {
        console.log(card.value)// similar to tic tac toe game this arrow function will run whats in () ie console.log
        card.innerText = card.value
        if (playerFirstCardSelected == '') {
            playerFirstCardSelected = card.value
            firstCardMatch = card
        }
        else {

            playerSecondCardSelected = card.value
            secondCardMatch = card
            if (playerFirstCardSelected == playerSecondCardSelected) {
                alert('Its a Match!')
                matches = matches + 1
            }

            if (matches == matches + 5) {
                alert('You Win, Game Over')
            }

            else if (playerFirstCardSelected !== playerSecondCardSelected) {
                alert('No match,Try Again')
                firstCardMatch.innerText = ''
                secondCardMatch.innerText = ''
            }

            fetch(`/api?choice1=${playerFirstCardSelected}&choice2=${playerSecondCardSelected}`)
                .then(response => response.json())
                .then((data) => {
                    console.log(data);
                })

            playerFirstCardSelected = ''//reseting the cards after not matched
            playerSecondCardSelected = ''
        }

    })

})

