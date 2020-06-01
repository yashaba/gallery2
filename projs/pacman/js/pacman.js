const PACMAN = '&#128512';

var gPacman;
var gFoodCollected = 0
var gDeadGhosts = []

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  // Hitting FOOD? update score
  if (nextCell === FOOD) {

    updateScore(1);
    gFoodCollected++
    if (gFoodCollected === 60) gameOver('You Won!')


  }
  if (nextCell === POWERFOOD && gPacman.isSuper === true) return
  if (nextCell === POWERFOOD) {
    gPacman.isSuper = true
    killGhosts()
    updateScore(1);
    gFoodCollected++
    setTimeout(reviveGhosts, 5000)

    if (gFoodCollected === 60) gameOver('You Won!')
  }
  if (nextCell === SUPERFOOD) updateScore(10);


  if (nextCell === GHOST && gPacman.isSuper === true) {

    updateScore(1)
    gFoodCollected++
    for (var idx = 0; idx < gGhosts.length; idx++) {
      if (nextLocation.i === gGhosts[idx].location.i
        && nextLocation.j === gGhosts[idx].location.j) {
        console.log('trigger')
        gDeadGhosts.push(gGhosts[idx])
        gGhosts.splice(idx, 1)
        gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
        renderCell(gPacman.location, EMPTY);
        gPacman.location = nextLocation;
        gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
        renderCell(gPacman.location, PACMAN);
        return

      }
    }
  }

  else if (nextCell === GHOST) {
    gameOver('You lost!')
    renderCell(gPacman.location, EMPTY);
    return;
  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);

}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    default: return null;
  }
  return nextLocation;
}