import { useState } from "react";

export default function Player({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    //if the new state depends on the previous state, this shouldnt be used
    //setIsEditing(!isEditing);
    //because react is scheduling this update and in some scenarios it may break
    //in this case here this delay will be like 2ms so wouldnt really matter

    //instead its better to pass a function so it will always get the currently value
    //the other way may give the old value
    setIsEditing((editing) => !editing);
  }

  return (
    <li>
      <span className="player">
        {!isEditing && <span className="player-name">{name}</span>}
        {isEditing && <input type="text" required value={name} />}
        <span className="player-symbol">{symbol}</span>
      </span>

      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
