import { useState, useEffect } from "react";
import "./App.css";

function App() {
	let initialState = ["", "", "", "", "", "", "", "", ""];
	const [gameState, setGameState] = useState(initialState);

	const onSquareClick = (index) => {
		if(gameState[index] !== "X" && gameState[index] !== "O") {
      let strings = Array.from(gameState);
      strings[index] = "X";
      let randomIndex = Math.floor(Math.random() * 9 + 1);
      while (strings[randomIndex] !== "") {
        randomIndex = Math.floor(Math.random() * 9 + 1);
      }
      strings[randomIndex] = "O";
      setGameState(strings);
    }
	};

	const clearHandler = () => {
		setGameState(initialState);
	};

	const checkWinner = () => {
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
				gameState[a] &&
				gameState[a] === gameState[b] &&
				gameState[a] === gameState[c]
			) {
				return gameState[a];
			}
		}
		return null;
	};

  useEffect(() => {
    const winner = checkWinner()
    // console.log(winner)
    if(winner) {
      alert(`${winner} wins`)
      clearHandler()
    } 
  }, [gameState])

	return (
		<div className="app-header">
			<main className="App-header">
				<h1 className="heading-text text ">Tic-Tac-Toe</h1>

				<div className="row jc-center">
					<div
						onClick={() => onSquareClick(0)}
						className="square b-bottom-right text"
					>
						{gameState[0]}
					</div>
					<div
						onClick={() => onSquareClick(1)}
						className="square b-bottom-right text"
					>
						{gameState[1]}
					</div>
					<div
						onClick={() => onSquareClick(2)}
						className="square b-bottom text"
					>
						{gameState[2]}
					</div>
				</div>
				<div className="row jc-center">
					<div
						onClick={() => onSquareClick(3)}
						className="square b-bottom-right text"
					>
						{gameState[3]}
					</div>
					<div
						onClick={() => onSquareClick(4)}
						className="square b-bottom-right text"
					>
						{gameState[4]}
					</div>
					<div
						onClick={() => onSquareClick(5)}
						className="square b-bottom text"
					>
						{gameState[5]}
					</div>
				</div>
				<div className="row jc-center">
					<div onClick={() => onSquareClick(6)} className="square b-right text">
						{gameState[6]}
					</div>
					<div onClick={() => onSquareClick(7)} className="square b-right text">
						{gameState[7]}
					</div>
					<div onClick={() => onSquareClick(8)} className="square text">
						{gameState[8]}
					</div>
				</div>

				<button onClick={clearHandler} className="clear-button">
					Clear
				</button>
			</main>

			<footer>
				Built with ❤️ by{" "}
				<a
					href="https://twitter.com/Deveshb15"
					target="_blank"
					rel="noreferrer"
				>
					Devesh
				</a>
			</footer>
		</div>
	);
}

export default App;
