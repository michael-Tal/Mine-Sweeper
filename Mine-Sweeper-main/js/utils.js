// buildBoard();
function printMat(mat, selector) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            // var cell = mat[i][j];
            var className = 'cell cell' + i + '-' + j;
            strHTML += `<td class="${className}" onclick="cellClicked(this, ${i}, ${j})" oncontextmenu="cellMarked(this, ${i}, ${j})"></td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;

    var elCount = document.querySelector('.mines');
    elCount.innerText = gMinesLeft;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
    elCell.style.backgroundColor = "aqua"
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getallCells(mat){
    var res =[];
    for(var i = 0; i<mat.length;i++){
        for(var j = 0; j< mat[i].length; j++){
            var cell = mat[i][j];
            res.push(cell);
        }
    }
    return res;
}

function drawNum2(cells) {
    var idx = getRandomIntInclusive(0, cells.length -1)
    var num = cells[idx]
    cells.splice(idx, 1)
    return num
  }
