import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";

//here we'll use from a concept called lifting state up
//we need to keep track of who should play, and this info can't go
//on the GameBoard component nor the Player one, so we need to get
//the closest ancestor component that contains the components we need
//to keep track of, in this case the App component has both Players and Gameboard inside of it
//so the app component will manage the state to keep track of whose turn is

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare(row, column) {
    setActivePlayer((currentActivePlayer) =>
      currentActivePlayer === "X" ? "O" : "X"
    );
    setGameTurns((prevTurns) => {
      let currentPlayer = "X";
      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        //so instead of trusting that activePlayer is updated(since it comes from another state)
        //we can take advantage that the game always starts from X and then checking the last object
        //if the last object data has an X, this one needs to be an O and vice-versa
        currentPlayer = "O";
      }
      //instead of doing player: activePlayer we should add a let inside this function
      const updatedTurns = [
        { square: { row: row, column: column }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
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
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
