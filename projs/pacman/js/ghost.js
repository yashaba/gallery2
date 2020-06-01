const GHOST = '&#128123';
// const GHOST = '&#128127';
var skull = '&#128128;'
var ghost = '&#128123;'
var devil = '&#128121;'
var baby = '&#128124;'
var gIntervalGhosts;
var gGhosts;
var gModels = [ghost, devil, skull]

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        model: gModels[0]
    };
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
    gModels.shift()
    console.log(gModels);
    
}


function createGhosts(board) {
    gGhosts = [];

    // empty the gGhosts array, create some ghosts
    createGhost(board)
    createGhost(board)
    createGhost(board)
    //  and run the interval to move them
    gIntervalGhosts = setInterval(moveGhosts, 3000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];

        // Create the moveDiff
        var moveDiff = getMoveDiff();
        var nextLocation = {
            i: ghost.location.i + moveDiff.i,
            j: ghost.location.j + moveDiff.j
        }
        // console.log('ghost.location', ghost.location, 'nextLocation', nextLocation, 'moveDiff', moveDiff)
        var nextCel = gBoard[nextLocation.i][nextLocation.j]
        // if WALL - give up
        if (nextCel === WALL) return
        // if GHOST - give up
        if (nextCel === GHOST) {
            return
        }

        if (nextCel === PACMAN && gPacman.isSuper === true)return
        // if PACMAN - gameOver
        if (nextCel === PACMAN) {
            gameOver('You lost!')
            return
        }

        // set back what we stepped on: update Model, DOM
        gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
        renderCell(ghost.location, ghost.currCellContent)

        // move the ghost
        ghost.location = nextLocation

        // keep the contnet of the cell we are going to
        ghost.currCellContent = gBoard[nextLocation.i][nextLocation.j]

        // move the ghost and update model and dom
        gBoard[ghost.location.i][ghost.location.j] = GHOST
        renderCell(ghost.location, ghost.model)

    }
}
function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100)
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    return `<span>${GHOST}</span>`
}

function killGhosts() {
    gModels = [ghost, devil, skull]
    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].model = baby
        renderCell(gGhosts[i].location, gGhosts[i].model)
        
        
    }
}

function reviveGhosts(){

    gPacman.isSuper = false
   /// debugger
    for (var i = 0; i < gDeadGhosts.length; i++) {
        gGhosts.push(gDeadGhosts[i])
        console.log(gGhosts) 
    }
    gDeadGhosts =  []

    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].model = gModels[i]
        renderCell(gGhosts[i].location, gGhosts[i].model)     
    } 
 }




