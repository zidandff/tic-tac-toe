import { useState } from 'react';
import Board from './assets/scripts/components/board';

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXisNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const currentCells = history[currentMove];

  function handlePlayAgain(winner) {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    if (winner === 'draw') {
      setXisNext(xIsNext);
    } else {
      setXisNext(winner === 'x' ? true : false);
    }
  }

  function handlePlay(newCells) {
    const newHistory = [...history.slice(0, currentMove + 1), newCells];
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
    setXisNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    // console.log(history[nextMove]);
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
        xIsNext={xIsNext}
        onPlay={handlePlay}
        onPlayAgain={handlePlayAgain}
      />
      <ol className="history-move">{historyMove}</ol>
    </div>
  );
}

export default Game;
