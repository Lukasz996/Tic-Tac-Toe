const PLAYER1 = 'fa-circle-o'
const PLAYER2 = 'fa-times'
let round = 1
const board = [
	['', '', ''],
	['', '', ''],
	['', '', ''],
]
const combinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
]

const boxes = [...document.querySelectorAll('.box')]
boxes.forEach(box => box.addEventListener('click', pick))

let gameOver = false

function pick(event) {
	if (gameOver) {
		return
	}

	const { row, column } = event.target.dataset
	const turn = round % 2 === 0 ? PLAYER2 : PLAYER1
	if (board[row][column] !== '') return
	event.target.classList.add(turn)
	board[row][column] = turn
	round++
	const result = check()
	if (result !== null) {
		gameOver = true
		console.log(result)
		boxes.forEach(box => box.removeEventListener('click', pick))
	}
}

function check() {
	const result = board.reduce((total, row) => total.concat(row))
	let winner = null
	let moves = {
		'fa-times': [],
		'fa-circle-o': [],
	}
	result.forEach((field, index) => (moves[field] ? moves[field].push(index) : null))
	combinations.forEach(combination => {
		if (combination.every(index => moves[PLAYER1].indexOf(index) > -1)) {
			winner = 'Winner: Player 1'
		}
		if (combination.every(index => moves[PLAYER2].indexOf(index) > -1)) {
			winner = 'Winner: Player 2'
		}
	})

	if (winner !== null) {
		return winner
	}

	if (result.every(field => field !== '')) {
		return 'Draw'
	}

	return null 
}

function reset() {
	round = 1
	board.forEach((row, rowIndex) => {
		row.forEach((col, colIndex) => {
			board[rowIndex][colIndex] = ''
			const box = document.querySelector(`[data-row='${rowIndex}'][data-column='${colIndex}']`)
			box.classList.remove(PLAYER1)
			box.classList.remove(PLAYER2)
			box.addEventListener('click',pick)
		})
	})
	gameOver = false
}
