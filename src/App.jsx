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

//this helper function is outside the component because it wont need access to any state or data related
//to that component, and it also shouldnt be recreated when the component rerenders
function deriveActivePlayer(gameTurns) {
  /* ok since we moved it to a function ignore the following comments */

  //even tho the code is almost the same as the one in handleSelectSquare we cant remove it from there
  //because we need to derive the state from the old state, and here we're getting from the current

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
