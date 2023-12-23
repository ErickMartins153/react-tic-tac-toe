import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import Gameover from "./Gameover";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";

//we moved this and the logic to print the gameboard to the App component
//having the gameboard here allows us to check the symbol on each square and
//get a winner
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

//here we'll use from a concept called lifting state up
//we need to keep track of who should play, and this info can't go
//on the GameBoard component nor the Player one, so we need to get
//the closest ancestor component that contains the components we need
//to keep track of, in this case the App component has both Players and Gameboard inside of it
//so the app component will manage the state to keep track of whose turn is

//this helper function is outside the component because it wont need access to any state or data related
//to that component, and it also shouldnt be recreated when the component rerenders
function deriveActivePlayer(gameTurns) {
  /* ok since we moved it to a function ignore the following comments 

  //even tho the code is almost the same as the one in handleSelectSquare we cant remove it from there
  //because we need to derive the state from the old state, and here we're getting from the current
*/

  let currentPlayer = "X"; //so now we're deriving the symbol from gameTurns
  //instead of getting it from the setGameTurns arrow function way, we can get the currently
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  //since we're using gameTurns state, this component is already updated by the square click
  //so we can remove this activePlayer and change the logic, getting it from gameTurns
  //const [activePlayer, setActivePlayer] = useState("X");

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];
  //instead of managing the state like before we're deriving state here
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, column } = square;
    gameBoard[row][column] = player;
    //gameBoard is a computed value that is derived from some state(gameTurns)
  }

  let winner;

  //lets derive if we have a winner from gameTurns
  for (const combination of WINNING_COMBINATIONS) {
    //we could add some logic to just check when it was possible to have played at least 3 times
    //but since the combinations are so little it really isnt a problem to check it always
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(row, column) {
    //setActivePlayer((currentActivePlayer) =>currentActivePlayer === "X" ? "O" : "X");
    setGameTurns((prevTurns) => {
      //with this following lines we're already getting the current player based on the last turn
      //so we really dont need activePlayer state
      let currentPlayer = deriveActivePlayer(prevTurns);
      //instead of doing player: activePlayer we should add a let inside this function
      const updatedTurns = [
        { square: { row: row, column: column }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        {(winner || hasDraw) && (
          <Gameover winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
