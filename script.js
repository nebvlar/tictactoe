const xMarker = 'x';
const cMarker = 'circle';
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageText = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton');
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let circleTurn;

startGame();

restartButton.addEventListener('click', startGame);

function startGame(){
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(xMarker);
        cell.classList.remove(cMarker);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
};

function handleClick(e){
    const cell = e.target;
    const currentClass = circleTurn ? cMarker : xMarker;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)){
        endGame(false);
    } else if (isDraw()){
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    };
};

function endGame(draw){
    if (draw){
        winningMessageText.innerText = 'Draw!';
    } else {
        winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    } 
    winningMessageElement.classList.add('show');
};

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(xMarker) || cell.classList.contains(cMarker)
    })
};

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
};

function swapTurns(){
    circleTurn = !circleTurn
};

function setBoardHoverClass(){
    board.classList.remove(xMarker);
    board.classList.remove(cMarker);
    if(circleTurn){
        board.classList.add(cMarker);
    } else {
        board.classList.add(xMarker);
    };
};

function checkWin(currentClass){
    return winningCombos.some(combination => {
        return combination.every (index => {
        return cellElements[index].classList.contains(currentClass)
    });
});
};