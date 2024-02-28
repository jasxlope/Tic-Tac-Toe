let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    const id = e.target.id

    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !==false){
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}

restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })

    playerText.innerHTML = 'Tic Tac Toe'

    currentPlayer = X_TEXT
}

startGame()

*//// Function to create a confetti element
function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.animationDuration = Math.random() * 3 + 2 + 's'; // Random duration between 2 to 5 seconds
    confetti.style.backgroundColor = 'rgb(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ')';
    document.getElementById('confetti-container').appendChild(confetti);

    // Remove confetti element after animation ends
    confetti.addEventListener('animationend', () => {
        confetti.remove();
    });
}

// Function to trigger confetti celebration
function celebrate() {
    for (let i = 0; i < 100; i++) {
        createConfetti();
    }
}

// Usage: Call the celebrate() function when a winner is announced
// Example: When a player wins the game
if (playerHasWon()) {
    playerText.indexHTML = `${currentPlayer} has won!`;
    celebrate();
}
