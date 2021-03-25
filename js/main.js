// 'use-strict'
const MINES = '💥'
const FLAG = '🚩'

var gBoard = null
var gLevel = {
    size: 4,
    mines: 2
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gMinesLeft;
var gNumOfMinsAround;
var gTimeInterval;
var startTime;

function init() {
    gMinesLeft = gLevel.mines;
    gBoard = buildBoard()
    setMinesNegsCount(gBoard);
    printMat(gBoard, '.game');
    gTimeInterval;
}

function buildBoard() {
    var SIZE = gLevel.size;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            var cell = {
                minesAroundCount: gNumOfMinsAround,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            if (i === getRandomInt(0,SIZE) && j === getRandomInt(0,SIZE) ||
                i === getRandomInt(0,SIZE) && j === getRandomInt(0,SIZE)) {
                cell.isMine = true;
            }
            board[i][j] = (cell);
        }
    }
    return board;
}

function cellClicked(elBtn, i, j) {
    if(!gGame.isOn){
        startTime = new Date().getTime();
        gTimeInterval =  setInterval(clockRunning,1)
    }
    if (!gGame.isOn) gGame.isOn = true
    var cell = gBoard[i][j];
    if (cell.isShown) return
    if (cell.isMine) {
        elBtn.innerText = MINES;
        gameOver();
        return;
    }
    gNumOfMinsAround = cell.minesAroundCount;
    if (cell.minesAroundCount === 0) revealNegsZero(gBoard, i, j);
    //update The Model
    cell.isShown = true;
    if (gBoard.isMine) return;
    //update The DOM
    elBtn.innerText = gNumOfMinsAround;

    checkGameOver(gBoard);
}

function setMinesNegsCount(mat) {
    for (var i = 0; i < mat.length; i++) {
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j]
            if (cell.isMine) continue;
            cell.minesAroundCount = setMinesNegsCountInBoard(mat, i, j)
        }
    }
}

function setMinesNegsCountInBoard(mat, rowIdx, colIdx) {
    var minesAroundCount = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > mat[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            var cell = mat[i][j];
            if (cell.isMine) minesAroundCount++
        }
    }
    return minesAroundCount
}

function revealNegsZero(mat, rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > mat[0].length - 1) continue
            var currCell = mat[i][j];
            var cell = { i: i, j: j };
            currCell.isShown = true;
            renderCell(cell, currCell.minesAroundCount);
            // ********complete recorshion.************

            // gNumOfMinsAround--
            // if (currCell.minesAroundCount === 0 &&gNumOfMinsAround!==-1) revealNegsZero(gBoard, cell.i, cell.j);
        }
    }
}

function gameOver() {
    clearInterval(gTimeInterval);
    gBoard = null
    gGame.isOn = false
    gNumOfMinsAround;
}

function restartGame() {
    gTimeInterval = 0;
    var elTime = document.querySelector('.clock');
    elTime.innerText = 0;
    init()
}

function cellMarked(elBtn, i, j) {
    elBtn.addEventListener('contextmenu', e =>
        e.preventDefault());
    elBtn.innerText = FLAG;
    gGame.markedCount++
    var cell = gBoard[i][j];
    cell.isMarked = true;
    if (gMinesLeft>0){
        gMinesLeft--
        var elCount = document.querySelector('.mines');
        elCount.innerText = gMinesLeft;

    }
    checkGameOver(gBoard)
}

function checkGameOver(board) {
    var countShowenCells = 0;
    var numOfMarked = 0
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            if (cell.isShown && !cell.isMine) countShowenCells++;
            if (cell.isMine && cell.isMarked) numOfMarked++
        }
    }
    var numOfCellsThatShown = gLevel.size ** 2 - gLevel.mines;
    if (countShowenCells === numOfCellsThatShown
        && numOfMarked === gLevel.mines) gameDone()
}

function gameDone() {
    clearInterval(gTimeInterval);
    gGame.isOn = false;
    gBoard = null;
}

function clockRunning() {
    var countTime = new Date().getTime();
    var diff = countTime - startTime
    var elTime = document.querySelector('.clock');
    elTime.innerText = diff;
}