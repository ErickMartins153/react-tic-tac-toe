import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
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
      const updatedBoard = [
        ...prevGameBoard.map((innerArray) => [...innerArray]),
      ];
      updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updatedBoard;
    });

    // this function is defined on the App component
    onSelectSquare();
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>
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
