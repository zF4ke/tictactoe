const xClass = 'x'
const oClass = 'o'
let xTurn

const cells = document.querySelectorAll('.cell')
const board = document.querySelector('#board')

const gameEndMessage = document.querySelector('[data-game-end-message]')
const gameEndElement = document.querySelector('#gameEndElement')

const restartButton = document.querySelector('#restartButton')

const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

startGame()

function startGame() {
    xTurn = true
    board.classList.add('x')

    cells.forEach(cell => {
        cell.classList.remove(xClass)
        cell.classList.remove(oClass)
        board.classList.replace('o', 'x')


        cell.addEventListener('click', handleClick, { once: true })
    })

    restartButton.addEventListener('click', startGame)

    gameEndElement.classList.remove('show')
    document.querySelector('main').classList.remove('end')
}

function handleClick(e) {
    let cell = e.target
    let turnClass = xTurn ? xClass : oClass

    placeMark(cell, turnClass)

    if (checkWin(turnClass)) {
        endGame(false)
    } else if (checkDraw()) {
        endGame(true)
    }

    swapTurn()
    setBoardHover()
}

function placeMark(cell, turnClass) {
    cell.classList.add(turnClass)
}

function swapTurn() {
    xTurn = !xTurn
}

function setBoardHover() {
    xTurn ? board.classList.replace('o', 'x') : board.classList.replace('x', 'o')
}

function checkWin(turnClass) {
    return lines.some(line => {
        return line.every(index => {
            return cells[index].classList.contains(turnClass)
        })
    })
}

function checkDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(oClass)
    })
}

function endGame(draw) {
    if (draw) {
        gameEndMessage.innerText = "Empate!"
    } else {
        gameEndMessage.innerText = `${xTurn ? "X's" : "O's"} venceu!`
    }

    gameEndElement.classList.add('show')
    document.querySelector('main').classList.add('end')
}