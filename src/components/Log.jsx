function Log({ turns }) {
  let lastThreeTurns = turns.slice(0, 3);

  return (
    <ol id="log">
      {lastThreeTurns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          Player {turn.player.Name} selected [{turn.square.row + 1},{" "}
          {turn.square.col + 1}]
        </li>
      ))}
    </ol>
  );
}

export default Log;
