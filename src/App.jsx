import { useState } from "react";
import { WINNING_COMBINATIONS } from "./utils/winning-combinations";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

const PLAYERS = [
  {
    Id: 1,
    Symbol: "X",
    Name: "Player 1",
  },
  {
    Id: 2,
    Symbol: "O",
    Name: "Player 2",
  },
];

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveGameBoard(turns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => array.slice())];

  for (let turn of turns) {
    let { square, player } = turn;
    let { row, col } = square;

    gameBoard[row][col] = player.Symbol;
  }

  return gameBoard;
}

function deriveActivePlayer(gameTurns) {
  let activePlayer = PLAYERS[0];

  if (
    gameTurns.length > 0 &&
    gameTurns[0].player.Symbol === PLAYERS[0].Symbol
  ) {
    activePlayer = PLAYERS[1];
  }

  return activePlayer;
}

function deriveWinner(gameBoard, players) {
  let winner = null;

  for (let combination of WINNING_COMBINATIONS) {
    let firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    let secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
    let thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      secondSquareSymbol === thirdSquareSymbol
    ) {
      winner = players.find((player) => player.Symbol === firstSquareSymbol);
    }
  }

  return winner;
}

function App() {
  let [players, setPlayers] = useState(PLAYERS);
  let [gameTurns, setGameTurns] = useState([]);

  let gameBoard = deriveGameBoard(gameTurns);
  let activePlayer = deriveActivePlayer(gameTurns);
  let winner = deriveWinner(gameBoard, players);
  let hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevGameTurns) => {
      let currentPlayer = deriveActivePlayer(prevGameTurns);

      let updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevGameTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(playerId, newName) {
    setPlayers((prevPlayers) => {
      prevPlayers.forEach((player) => {
        if (player.Id === playerId) {
          player.Name = newName;
        }
      });

      return [...prevPlayers];
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {PLAYERS.map((player, playerIndex) => (
            <Player
              player={player}
              isActive={activePlayer === player.Symbol}
              onChangeName={handlePlayerNameChange}
              key={playerIndex}
            />
          ))}
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
