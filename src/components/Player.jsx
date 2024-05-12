import { useState } from "react";

function Player({ player, isActive, onChangeName }) {
  let [isEditing, setIsEditing] = useState(false);
  let [playerName, setPlayerName] = useState(player.Name);

  function handleEditClick() {
    setIsEditing((editing) => !editing);

    if (isEditing) {
      onChangeName(player.Id, playerName);
    }
  }

  function handlePlayerNameChange(event) {
    setPlayerName(event.target.value);
  }

  let playerNameContainer = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    playerNameContainer = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handlePlayerNameChange}
      />
    );
  }

  return (
    <li className={isActive ? "active" : "undefined"}>
      <span className="player">
        {playerNameContainer}
        <span className="player-symbol">{player.Symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}

export default Player;
