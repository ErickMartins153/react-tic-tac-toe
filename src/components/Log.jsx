export default function Log({ turns }) {
  //the log will have the information of who did what
  //but the information about which button was clicked
  //is generated in the GameBoard component, so we need to lift
  //the state up again

  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row},${turn.square.column}`}>
          {turn.player} selected {turn.square.row},{turn.square.column}
        </li>
      ))}
    </ol>
  );
}
