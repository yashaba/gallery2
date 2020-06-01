const WALL = 'WALL';
const FLOOR = 'FLOOR';
const BALL = 'BALL';
const GAMER = 'GAMER';
const GLUE = 'GLUE';
const TELEPORTERW = 'TELEPORTERW';

const GAMER_IMG = '<img src="img/gamer.png">';
const BALL_IMG = '<img src="img/ball.png">';
var ballIntervalId

var gGamerPos = { i: 2, j: 9 };
var gBoard
var gBallCount = 2
var gamerCantMove = false

init()
function init() {
	document.querySelector('button').style.display = 'none'
	gGamerPos = { i: 2, j: 9 }
	gBoard = buildBoard();
	renderBoard(gBoard);
	gBallCount = 2
	ballGenerator()



}
//renderBoard(gBoard);

function buildBoard() {
	// var board = createMat(10,12);
	// Create the Matrix 10 * 12 
	var board = new Array(10)
	for (var i = 0; i < board.length; i++) {
		board[i] = new Array(12)
	}


	// Put FLOOR everywhere and WALL at edges
	for (i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var piece = { type: FLOOR, gameElement: '' }
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
				piece.type = WALL
			}

			board[i][j] = piece;
		}

	}

	// Place the gamer
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER
	board[2][3].gameElement = BALL
	board[4][6].gameElement = BALL
	board[0][6].type = TELEPORTERW
	board[9][6].type = FLOOR
	board[4][0].type = FLOOR
	board[4][11].type = FLOOR

	// console.log(board);
	return board;
}


function ballGenerator() {
	ballIntervalId = setInterval(function () {
		var randomI = getRandomInt(1, 9)
		var randomJ = getRandomInt(1, 11)
		var ballPos = { i: randomI, j: randomJ }
		if (gBoard[randomI][randomJ].gameElement === BALL ||
			gBoard[randomI][randomJ].gameElement === GAMER) return
		gBoard[randomI][randomJ].gameElement = BALL
		renderCell(ballPos, BALL_IMG)
		gBallCount++

	}, 3000)


}

var glueIntervalId
glueGenrator()
function glueGenrator() {
	glueIntervalId = setInterval(function () {
		var randomI = getRandomInt(1, 9)
		var randomJ = getRandomInt(1, 11)
		var gluePos = { i: randomI, j: randomJ }
		if (gBoard[randomI][randomJ].gameElement === BALL ||
			gBoard[randomI][randomJ].gameElement === GAMER) return
		gBoard[randomI][randomJ].gameElement = GLUE
		renderCell(gluePos, 'Glue')
		
       console.log('gamerpos' , gGamerPos)
	   
	   setTimeout(function () {
		   
		   if(gGamerPos.i===randomI && gGamerPos.j===randomJ)return
			gBoard[randomI][randomJ].gameElement = ''
	    	renderCell(gluePos, '')
		}, 3000)


	   

	}, 5000)



}


// Render the board to an HTML table
function renderBoard(board) {

	var elBoard = document.querySelector('.board');
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			strHTML += '\t<td class="cell ' + cellClass + '"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}
	// console.log('strHTML is:');
	// console.log(strHTML);
	elBoard.innerHTML = strHTML;
}




// Move the player to a specific location
function moveTo(i, j) {
	if (gamerCantMove) return
	// console.log(i, j)
	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;

	// Calculate distance to ake sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);
    
	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {

		if (targetCell.gameElement === BALL) {
			gBallCount--
			console.log(gBallCount)
			if (gBallCount === 0) {

				alert('You win!}')
				clearInterval(ballIntervalId)
				document.querySelector('button').style.display = 'block'

			}
		}
		console.log(targetCell)
		if (targetCell.type === TELEPORTERW) {
			gBoard[1][6].gameElement = ''
			renderCell(gGamerPos, '')
			gGamerPos.i = 8
			gGamerPos.j = 6
			gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER
			renderCell(gGamerPos, GAMER_IMG)
			return
		}


		if (targetCell.gameElement === GLUE) {
			gamerCantMove = true

			setTimeout(function(){
			gamerCantMove = false
			},3000)

			
		}

		gBoard[gGamerPos.i][gGamerPos.j].gameElement = ''
		renderCell(gGamerPos, '')
		gGamerPos.i = i
		gGamerPos.j = j
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER
		renderCell(gGamerPos, GAMER_IMG)

	} else console.log('TOO FAR', iAbsDiff, jAbsDiff);

}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {
	console.log(event.key)
	var i = gGamerPos.i;
	var j = gGamerPos.j;

	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;
		case (i === 4 , j === 0):
			moveTo(4 , 10);
			break;

	}

}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

