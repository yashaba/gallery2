'use strict';
const WALL = '&#128306';
const FOOD = '.';
const POWERFOOD = '&#129382';
const SUPERFOOD = '&#129362';

const EMPTY = ' ';

var gBoard;
var gGame = {
  score: 0,
  isOn: false,
};

function init() {
  
  gBoard = buildBoard();

  createPacman(gBoard);
  createGhosts(gBoard);

  printMat(gBoard, '.board-container');
  // console.table(gBoard);
  gGame.isOn = true;
  gFoodCollected = 0
  gGame.score = 0
  gModels = [ghost, devil, skull]

}




function renderModal(winOrLose) {
  var strHTML = `<div onclick="init()" class="modal"> ${winOrLose} <br> Play Again? </div>`;
  
  var elContainer = document.querySelector('.board-container');
  elContainer.innerHTML = strHTML;


}
function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
      }
      if ((i === 1 && j === 1) || (i===1 && j=== 8)||
      (i === 8 && j === 1)||(i=== 8 && j === 8)) {

        board[i][j] = POWERFOOD;
      }
    }
  }
  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
}

function gameOver(winOrLose) {
  console.log('Game Over');
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  renderModal(winOrLose)
}



var superFoodInterval = setInterval(function() {placeSuperFood(gBoard)}, 5000);

function placeSuperFood(gBoard) {
 
  var randI = getRandomIntInclusive(1, 8)
  var randJ = getRandomIntInclusive(1, 8)

  // gBoard[randI][randJ] = (gBoard[randI][randJ] === EMPTY) ? SUPERFOOD : placeSuperFood(gBoard)
  if(gBoard[randI][randJ] === EMPTY) {
    gBoard[randI][randJ] = SUPERFOOD
    var currLocation = {i:randI , j:randJ }
    renderCell(currLocation, SUPERFOOD)
  }else  placeSuperFood(gBoard)

  //if (gBoard[randI][randJ] !== "")



}



