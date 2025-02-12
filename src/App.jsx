import { useState } from 'react';
import Board from './assets/scripts/components/board';

function Game() {
  const [history, setHistory] = useState([
    {
      cells: Array(9).fill(null),
      xIsNext: true,
    },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const { cells: currentCells, xIsNext: currentXisNext } = history[currentMove];

  function handlePlay(newCells) {
    let newHistory = {
      cells: newCells,
      xIsNext: !currentXisNext, // TURN PLAYER MOVE
    };
    newHistory = [...history.slice(0, currentMove + 1), newHistory];
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
  }

  function handlePlayAgain(winner) {
    // RESET PLAYER MOVE BY WHO'S WINNING LAST
    const resetNextTurn = () => {
      if (winner === 'draw') {
        return !currentXisNext;
      } else {
        return winner === 'x' ? true : false;
      }
    };

    setHistory([
      {
        cells: Array(9).fill(null),
        xIsNext: resetNextTurn(),
      },
    ]);
    setCurrentMove(0);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const historyMove = history.map((cell, move) => {
    let moveText;
    if (move > 0) {
      moveText = `go to move #${move}`;
    } else {
      moveText = 'Go to game start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{moveText}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <Board
        cells={currentCells}
        xIsNext={currentXisNext}
        onPlay={handlePlay}
        onPlayAgain={handlePlayAgain}
      />
      <ol className="history-move">{historyMove}</ol>
    </div>
  );
}

export default Game;
