import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";

//here we'll use from a concept called lifting state up
//we need to keep track of who should play, and this info can't go
//on the GameBoard component nor the Player one, so we need to get
//the closest ancestor component that contains the components we need
//to keep track of, in this case the App component has both Players and Gameboard inside of it
//so the app component will manage the state to keep track of whose turn is

function App() {
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare() {
    setActivePlayer((currentActivePlayer) =>
      currentActivePlayer === "X" ? "O" : "X"
    );
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
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayer}
        />
      </div>
    </main>
  );
}

export default App;
