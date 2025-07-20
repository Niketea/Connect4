const turner = document.querySelector("#Player");
const tempCells = document.querySelectorAll(".cell");
const resetButton = document.querySelector("#resetButton");

const cells = [
    [null,null,null,null,null,null,null,],
    [null,null,null,null,null,null,null,],
    [null,null,null,null,null,null,null,],
    [null,null,null,null,null,null,null,],
    [null,null,null,null,null,null,null,],
    [null,null,null,null,null,null,null,],
];

let numCells =[
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
];

let currentPlayer = "Red";
let playing = false;


intialize();

function intialize(){
    tempCells.forEach(cell => cells[Number(cell.getAttribute("rowIndex"))][Number(cell.getAttribute("columnIndex"))] = cell);
    playing = true;
    console.log(cells);
    turner.textContent = `${currentPlayer}'s turn`;
    cells.forEach(subCells => subCells.forEach(cell => cell.addEventListener("click",updateColumn)));
    resetButton.addEventListener("click",restart);
}
function updateColumn(){
    const columnIndex = Number(this.getAttribute("columnIndex"));
    let findRowIndex = function(){
        for(let i = 5; i >= 0; i--){
            if(window.getComputedStyle(cells[i][columnIndex]).backgroundColor == "rgba(0, 0, 0, 0)"){
                return i;
            }   
        }
    }
    let rowIndex = findRowIndex();
    if(rowIndex != null && playing)
    {
        console.log(`${rowIndex} and ${columnIndex}`);
        cells[rowIndex][columnIndex].style.backgroundColor = currentPlayer === "Red" ? "red" : "yellow";
        numCells[rowIndex][columnIndex] = currentPlayer == "Red"? 1: 2;
        console.log(numCells);
        checkForWin();
        console.log(numCells);
    }
}
function checkForWin(){
    //horz
    for(let i = 0; i < 6; i++){
        for(let j = 0; j < 4; j++){
           if(numCells[i][j] != 0 && numCells[i][j] === numCells[i][j+1] && numCells[i][j] ===  numCells[i][j+2] && numCells[i][j] === numCells[i][j+3]){
                winSequence();
                return;
           }
        }
    }

    //vert
    for(let i = 3; i <= 5; i++){
        for(let j = 0;j < 7;j++){
            if(numCells[i][j] != 0 && numCells[i][j] === numCells[i-1][j] && numCells[i][j] === numCells[i-2][j] && numCells[i][j] === numCells[i-3][j]){
                winSequence();
                return;
            }
        }
    }

    //diag bottom-left to top right

    for(let i = 2; i >= 0; i--){
        for(let j = 0; j < 4; j++){
            if(numCells[i][j] != 0 && numCells[i][j] === numCells[i+1][j+1] && numCells[i][j] === numCells[i+2][j+2] && numCells[i][j] === numCells[i+3][j+3]){
                winSequence();
                return;
            }
        }
    }

    // diag top left to bottom right
    for(let i = 3;i< 6;i++){
        for(let j = 0; j < 4; j++){
            if(numCells[i][j] != 0 && numCells[i][j] === numCells[i-1][j+1] && numCells[i][j] === numCells[i-2][j+2] && numCells[i][j] === numCells[i-3][j+3]){
                winSequence();
                return;
            }
        }
    }
    changePlayer();
}
function winSequence(){
    console.log("win Detected");
    turner.textContent = `${currentPlayer} Wins!`;
    playing = false;
}
function changePlayer(){
    currentPlayer = currentPlayer == "Red" ? "Yellow": "Red";
    turner.textContent = `${currentPlayer}'s turn`;
}
function restart(){
    numCells =[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],];
    cells.forEach(subCells => subCells.forEach(cell => cell.style.backgroundColor = ""));
    currentPlayer = "Red";
    turner.textContent = `${currentPlayer}'s turn`;
    playing = true;
}