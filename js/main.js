// 'use-strict'
const MINES = '<img src="pic/mine.jpeg"></img>'
const FLAG = '<img src="pic/flag.png"></img>'

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

var gNumOfMinsAround;
function init() {
    gBoard = buildBoard()
    printMat(gBoard, '.game');
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
            if (i === 1 && j === 3 ||
                i === 1 && j === 1) {
                cell.isMine = true;
                // var currCell = {i:i,j:j};
            }
            board[i][j] = (cell);
        }
    }
    console.log(board);
    return board;
}

function cellClicked(elBtn, i, j) {
    if (event.button == 2){

    } 
    if (!gGame.isOn) gGame.isOn = true
    gNumOfMinsAround = setMinesNegsCount(gBoard, i, j);
    // revealNegsZero(elBtn, gBoard, i, j);
    var cell = gBoard[i][j];
    if (cell.isMine) {
        gameOver();
        return;
    }
    //update The Model
    cell.minesAroundCount = gNumOfMinsAround;
    cell.isShown = true;
    if (gBoard.isMine) return;
    //update The DOM
    elBtn.innerText = gNumOfMinsAround;
}

//Count mines around each cell and set the cell's minesAroundCount
// function setMinesNegsCount(board) {
function setMinesNegsCount(mat, rowIdx, colIdx) {
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

function revealNegsZero(elBtn, mat, rowIdx, colIdx) {
    var res = [];
    // var minesAroundCount = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > mat[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue

            // var cell = mat[i][j];
            if (!mat[rowIdx][colIdx].isMine || mat[rowIdx][colIdx].minesAroundCount === 0) cellClicked(elBtn, i, j);
            // if (cell.isMine) minesAroundCount++
        }
    }
    // return minesAroundCount
}

function gameOver() {
    console.log('Game Over');
    gBoard = null
    gGame.isOn = false
    gNumOfMinsAround;
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block'
    var elTextGameOver = document.querySelector('.over')
    elTextGameOver.style.display = 'block'
}

function restartGame() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
    var elTextGameOver = document.querySelector('.over')
    elTextGameOver.style.display = 'none'
    var elTextGameDone = document.querySelector('.done')
    elTextGameDone.style.display = 'none'
    // gBoard;
    // gGame = {
    //     score: 0,
    //     isOn: false
    // }
    init()
}
// function gameOver() {
//     gGame.isOn = false;  
//     // clearInterval(gIntervalCherry);
//     // clearInterval(gIntervalGhosts);
//     gIntervalGhosts = null

//     // TODO
// }

function onButtonClick(event) {
    if (event.button == 2){

    }  
}


