import { useState, useEffect } from "react";
import "./App.css";

function App() {
	const aiPlayer = "O"
	const huPlayer = "X"
	let initialState = ["", "", "", "", "", "", "", "", ""];
	const [gameState, setGameState] = useState(initialState);
	const [winnerStatus, setWinnerStatus] = useState("");
	const [tieHand, setTieHand] = useState(0)
	const [winState, setWinState] = useState([])
	
	const emptySquares = (strings) => {
		const arr = ["", "", "", "", "", "", "", "", ""]
		const empty = []
		for(let i = 0; i < arr.length; i++) {
			if(arr[i] === strings[i]) {
				empty.push(i)
			}
		}

		return empty
	}
	
	const minmax = (arr, player) => {
		let strings = [...arr]
		const availSpots = emptySquares(strings)
		// console.log("EMo ", availSpots)
		const winner = checkWinner(strings);
		const tie = checkTie(strings)
		if(tie===9) {
			if (winner === huPlayer) {
				return { score: -10 }
				//   clearHandler()
			} else if(winner === aiPlayer) {
				return { score: 10}
			} else {
				return { score: 0 }
			}
		} else if(winner) {
			if (winner === huPlayer) {
				return { score: -10 }
				//   clearHandler()
			} else if(winner === aiPlayer) {
				return { score: 10}
			}
		} 
		
		if(availSpots.length === 0) {
			return { score: 0 }
		}

		let moves = []
		for(let i = 0; i < availSpots.length; i++) {
			let move = {}
			move.index = availSpots[i]
			strings[availSpots[i]] = player
			if(player === aiPlayer) {
				let result = minmax(strings, huPlayer)
				move.score = result.score
			} else {
				let result = minmax(strings, aiPlayer)
				move.score = result.score
			}

			strings[availSpots[i]] = ''
			moves.push(move)
		}

		
		let bestMove;
		if(player === aiPlayer) {
			let bestScore = -1000000
			for(let i = 0; i<moves.length; i++) {
				if(moves[i].score > bestScore) {
					bestScore = moves[i].score
					bestMove = i
				}
			}
		} else {
			let bestScore = 1000000
			for(let i = 0; i<moves.length; i++) {
				if(moves[i].score < bestScore) {
					bestScore = moves[i].score
					bestMove = i
				}
			}
		}

		// console.log(moves)
		// console.log(moves[bestMove])
		return moves[bestMove]
	}

	const bestSpot = (strings) => {
		// console.log(tieHand)
		let randNoise = [0, 1]
		if(tieHand >= randNoise[Math.floor(Math.random()*randNoise.length)]) {
			// console.log("Best")
			const minmaxAns = minmax(strings, aiPlayer)
			return minmaxAns.index
		} else {
			// console.log("Ran")
			const arr = emptySquares(strings)
			return arr[Math.floor(Math.random()*arr.length)]
		}
		// console.log(minmaxAns) 
		// console.log(minmaxAns.index) 
	}

	const onSquareClick = (index) => {
		if (gameState[index] !== huPlayer && gameState[index] !== aiPlayer) {
			let strings = Array.from(gameState);
			strings[index] = huPlayer;
			// let randomIndex = Math.floor(Math.random() * 9);
			// while (strings[randomIndex] !== "") {
			// 	randomIndex = Math.floor(Math.random() * 9);
			// }
			const bestIndex = bestSpot(strings)
			// console.log(bestIndex)
			strings[bestIndex] = aiPlayer;
			// strings[randomIndex] = aiPlayer;
			// console.log(strings)
			setGameState(strings);
		}
	};

	const clearHandler = () => {
		setGameState(initialState);
		setWinState([])
	};

	const checkWinner = (strings) => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (
				strings[a] &&
				strings[a] === strings[b] &&
				strings[a] === strings[c]
			) {
				return strings[a];
			}
		}
		return null;
	};

	const playAgainHandler = () => {
		setWinnerStatus("");
		clearHandler();
	};

	const checkTie = (strings) => {
		let tie = 0
		for(let ass of strings) {
			if(ass === 'X' || ass === 'O') {
				tie++
			}
		}
		return tie
	}

	useEffect(() => {
		const winner = checkWinner(gameState);
		// console.log(winner)
		let tie = checkTie(gameState)
		setTieHand(tie)
		if (winner) {
			setWinnerStatus(winner);
			//   clearHandler()
		}
	}, [gameState]);

	useEffect(() => {
		if(tieHand === 9) {
			const winner = checkWinner(gameState);
			if (winner) {
				setWinnerStatus(winner);
				//   clearHandler()
			} else {
				setWinnerStatus('T')
			}
		}
		
	}, [tieHand])

	const DefaultComponent = () => (
		<div>
			<h1 className="heading-text">Tic Tac Toe</h1>
			<div className="row jc-center">
				<div
					onClick={() => onSquareClick(0)}
					className={`square text ${
						(winState.includes(0)) && "square-winner"
					} ${gameState[0] === 'X' ? 'x-color' : 'o-color'}`
					}
				>
					<p className="text p-span">{gameState[0]}</p>
				</div>
				<div
					onClick={() => onSquareClick(1)}
					className={`square text ${
						(winState.includes(1)) && "square-winner"
					} ${gameState[1] === 'X' ? 'x-color' : 'o-color'}`}
				>
					<p className="text p-span">{gameState[1]}</p>
				</div>
				<div
					onClick={() => onSquareClick(2)}
					className={`square text ${
						(winState.includes(2)) && "square-winner"
					} ${gameState[2] === 'X' ? 'x-color' : 'o-color'}`}
				>
					<p className="text p-span">{gameState[2]}</p>
				</div>
			</div>
			<div className="row jc-center">
				<div
					onClick={() => onSquareClick(3)}
					className={`square text ${
						(winState.includes(3)) && "square-winner"
					} ${gameState[3] === 'X' ? 'x-color' : 'o-color'}`}
				>
					<p className="text p-span">{gameState[3]}</p>
				</div>
				<div
					onClick={() => onSquareClick(4)}
					className={`square text ${
						(winState.includes(4)) && "square-winner"
					} ${gameState[4] === 'X' ? 'x-color' : 'o-color'}`}
				>
					<p className="text p-span">{gameState[4]}</p>
				</div>
				<div
					onClick={() => onSquareClick(5)}
					className={`square text ${
						(winState.includes(5)) && "square-winner"
					} ${gameState[5] === 'X' ? 'x-color' : 'o-color'}`}
				>
					<p className="text p-span">{gameState[5]}</p>
				</div>
			</div>
			<div className="row jc-center">
				<div
					onClick={() => onSquareClick(6)}
					className={`square text ${
						(winState.includes(6)) && "square-winner"
					} ${gameState[6] === 'X' ? 'x-color' : 'o-color'}`}
				>
					<p className="text p-span">{gameState[6]}</p>
				</div>
				<div
					onClick={() => onSquareClick(7)}
					className={`square text ${
						(winState.includes(7)) && "square-winner"
					} ${gameState[7] === 'X' ? 'x-color' : 'o-color'}`}
				>
					<p className="text p-span">{gameState[7]}</p>
				</div>
				<div
					onClick={() => onSquareClick(8)}
					className={`square text ${
						(winState.includes(8)) && "square-winner"
					} ${gameState[8] === 'X' ? 'x-color' : 'o-color'}`}
				>
					<p className="text p-span">{gameState[8]}</p>
				</div>
			</div>

			<div>
				<button onClick={clearHandler} className="clear-button">
					Clear
				</button>
			</div>
		</div>
	);

	const WinnerComponent = () => (
		<div className="winner-component">
			<h1 className="heading-text text ">
				{
					winnerStatus === 'T' ? (
						"It's a tie👔"
					) : (
						winnerStatus === 'X' ? (
							'You Won 🎉'
						) : (
							'You Lost 🤕'
						)
					)
				}
			</h1>
			<button onClick={() => playAgainHandler()} className="play-again-button">
				Play Again
			</button>
		</div>
	);

	return (
		<div className="app-header">
			<main>
				<DefaultComponent />
				{(winnerStatus === "T" || winnerStatus === huPlayer || winnerStatus === aiPlayer) && <WinnerComponent />}
				<div className="asset-logo">
					<svg width="80" height="50" viewBox="0 0 133 51" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M28.2422 50.2021H4.70703C3.45865 50.2021 2.26139 49.6512 1.37866 48.6705C0.495917 47.6897 0 46.3596 0 44.9727V8.36621C0 6.97926 0.495917 5.64912 1.37866 4.6684C2.26139 3.68768 3.45865 3.13672 4.70703 3.13672H21.1816L32.9492 16.2104V44.9727C32.9492 46.3596 32.4533 47.6897 31.5705 48.6705C30.6878 49.6512 29.4905 50.2021 28.2422 50.2021Z" fill="#D6B9FC" fillOpacity="0.3"/>
						<path d="M31.0752 47.0654H7.54004C6.29165 47.0654 5.0944 46.5145 4.21166 45.5337C3.32893 44.553 2.83301 43.2229 2.83301 41.8359V5.22949C2.83301 3.84254 3.32893 2.5124 4.21166 1.53168C5.0944 0.550963 6.29165 0 7.54004 0H24.0146L35.7822 13.0737V41.8359C35.7822 43.2229 35.2863 44.553 34.4035 45.5337C33.5208 46.5145 32.3236 47.0654 31.0752 47.0654Z" fill="#D6B9FC"/>
						<path d="M24.0898 0V10.459C24.0898 11.1525 24.3378 11.8175 24.7792 12.3079C25.2205 12.7983 25.8192 13.0737 26.4434 13.0737H35.8574" fill="white" fillOpacity="0.7"/>
						<path d="M25.0876 32.3438H27.8846L22.2475 17.498H18.3317L12.6731 32.3438H15.7068L16.7395 29.7188H24.0548L25.0876 32.3438ZM17.9874 26.47L20.096 21.0911H20.6769L22.7854 26.47H17.9874Z" fill="#0B0C0E"/>
						<path d="M55.298 21.1016H58.5612L51.9846 3.78148H47.4161L40.8144 21.1016H44.3537L45.5586 18.0392H54.0931L55.298 21.1016ZM47.0145 14.2488L49.4744 7.97344H50.1522L52.6121 14.2488H47.0145ZM66.2203 21.4028C70.1613 21.4028 73.2989 19.1938 73.2989 15.8051C73.2989 12.5921 70.4123 11.1111 67.0487 10.6091C65.6179 10.4083 62.5304 9.88116 62.5304 8.62608C62.5304 7.69733 64.0114 7.06979 65.9944 7.06979C68.2033 7.06979 69.7847 7.84794 69.7847 8.852H72.9726C72.9726 5.81471 70.0608 3.48026 66.0948 3.48026C62.2794 3.48026 59.3174 5.61389 59.3174 8.8269C59.3174 11.9395 62.0785 13.5711 65.2413 14.048C67.4754 14.3994 70.0859 14.8513 70.0859 16.1315C70.0859 17.1355 68.4292 17.8133 66.3458 17.8133C63.9612 17.8133 62.2041 16.9347 62.2041 15.8051H59.0162C59.0162 18.993 62.0785 21.4028 66.2203 21.4028ZM81.9333 21.4028C85.8742 21.4028 89.0119 19.1938 89.0119 15.8051C89.0119 12.5921 86.1253 11.1111 82.7616 10.6091C81.3309 10.4083 78.2434 9.88116 78.2434 8.62608C78.2434 7.69733 79.7244 7.06979 81.7074 7.06979C83.9163 7.06979 85.4977 7.84794 85.4977 8.852H88.6856C88.6856 5.81471 85.7738 3.48026 81.8078 3.48026C77.9924 3.48026 75.0304 5.61389 75.0304 8.8269C75.0304 11.9395 77.7915 13.5711 80.9543 14.048C83.1884 14.3994 85.7989 14.8513 85.7989 16.1315C85.7989 17.1355 84.1422 17.8133 82.0588 17.8133C79.6742 17.8133 77.917 16.9347 77.917 15.8051H74.7291C74.7291 18.993 77.7915 21.4028 81.9333 21.4028ZM94.4584 17.3112V14.2237H103.043V10.5589H94.4584V7.57182H103.871V3.78148H91.3709V21.1016H103.997V17.3112H94.4584ZM119.621 3.78148H105.539V7.57182H111.037V21.1016H114.124V7.57182H119.621V3.78148Z" fill="white"/>
						<path d="M42.2954 46.1016H45.3829V34.5548H45.9351L49.9514 42.7129H53.0137L57.0551 34.5548H57.6073V46.1016H60.6948V28.7815H56.0761L51.6834 37.2658H51.1311L46.7635 28.7815H42.2954V46.1016ZM72.3227 46.4028C77.5439 46.4028 81.4848 42.5371 81.4848 37.4415C81.4848 32.3459 77.5439 28.4803 72.3227 28.4803C67.1016 28.4803 63.1607 32.3459 63.1607 37.4415C63.1607 42.5371 67.1016 46.4028 72.3227 46.4028ZM72.3227 42.5371C68.934 42.5371 66.3486 40.3533 66.3486 37.4415C66.3486 34.5297 68.934 32.3459 72.3227 32.3459C75.7114 32.3459 78.2969 34.5297 78.2969 37.4415C78.2969 40.3533 75.7114 42.5371 72.3227 42.5371ZM83.9434 46.1016H87.0309V35.1322H87.4827L95.4399 46.1016H98.9541V28.7815H95.8415V39.7509H95.4148L87.4325 28.7815H83.9434V46.1016ZM105.318 42.3112V39.2237H113.902V35.5589H105.318V32.5718H114.731V28.7815H102.23V46.1016H114.856V42.3112H105.318ZM122.396 46.1016H125.483V40.3784L132.06 28.7815H128.345L124.103 35.9103H123.575L119.333 28.7815H115.794L122.396 40.3784V46.1016Z" fill="white"/>
						<path d="M42.2954 46.1016H45.3829V34.5548H45.9351L49.9514 42.7129H53.0137L57.0551 34.5548H57.6073V46.1016H60.6948V28.7815H56.0761L51.6834 37.2658H51.1311L46.7635 28.7815H42.2954V46.1016ZM72.3227 46.4028C77.5439 46.4028 81.4848 42.5371 81.4848 37.4415C81.4848 32.3459 77.5439 28.4803 72.3227 28.4803C67.1016 28.4803 63.1607 32.3459 63.1607 37.4415C63.1607 42.5371 67.1016 46.4028 72.3227 46.4028ZM72.3227 42.5371C68.934 42.5371 66.3486 40.3533 66.3486 37.4415C66.3486 34.5297 68.934 32.3459 72.3227 32.3459C75.7114 32.3459 78.2969 34.5297 78.2969 37.4415C78.2969 40.3533 75.7114 42.5371 72.3227 42.5371ZM83.9434 46.1016H87.0309V35.1322H87.4827L95.4399 46.1016H98.9541V28.7815H95.8415V39.7509H95.4148L87.4325 28.7815H83.9434V46.1016ZM105.318 42.3112V39.2237H113.902V35.5589H105.318V32.5718H114.731V28.7815H102.23V46.1016H114.856V42.3112H105.318ZM122.396 46.1016H125.483V40.3784L132.06 28.7815H128.345L124.103 35.9103H123.575L119.333 28.7815H115.794L122.396 40.3784V46.1016Z" fill="#D6B9FC"/>
					</svg>
				</div>
			</main>
		</div>
	);
}

export default App;
