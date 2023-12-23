export default function GameBoard({ onSelectSquare, board }) {
  //we're going to manage the gameBoard situation on the App component, by the gameTurns one
  //because the Log component also need some of those infos, and the App is a parent for both
  //we're going to improve the way of doing it
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  //function handleSelectSquare(rowIndex, colIndex) {
  //setGameBoard((prevGameBoard) => {
  //doing it like:
  /*
      prevGameBoard[rowIndex][colIndex] = "X";
      return prevGameBoard; */
  //its not recommended, objects and arrays are reference values
  //and should never be mutate directly, its better to create a copy of it
  //and then change the copy and return it.
  //if we did it directly we'd be updating the old value in memory imediately
  //before even the react schedule thing happened properly, so this could lead to
  //weird side effects and bugs

  //we had to use map to also spread the innerArrays, or it would be the reference
  //const updatedBoard = [
  //..prevGameBoard.map((innerArray) => [...innerArray]),
  //];
  //updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //return updatedBoard;
  //});

  // this function is defined on the App component
  //onSelectSquare();
  //}

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
