import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    //if the new state depends on the previous state, this shouldnt be used
    //setIsEditing(!isEditing);
    //because react is scheduling this update and in some scenarios it may break
    //in this case here this delay will be like 2ms so wouldnt really matter

    //instead its better to pass a function so it will always get the currently value
    //the other way may give the old value
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChange(e) {
    //we're getting the value from the input and updating it also in the input
    //this is called two-way-binding, we refeed the value to the place where we got it
    setPlayerName(e.target.value);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {!isEditing && <span className="player-name">{playerName}</span>}
        {isEditing && (
          <input
            type="text"
            required
            value={playerName}
            onChange={(e) => handleChange(e)}
          />
        )}
        <span className="player-symbol">{symbol}</span>
      </span>

      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
