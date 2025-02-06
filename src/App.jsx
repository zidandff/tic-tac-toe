import { useState } from 'react';

function Cell({ value, onCellClick }) {
  return (
    <button className="cell" onClick={onCellClick}>
      {value}
    </button>
  );
}

function Board({ currentCells: cells, onPlay }) {
  // const [cells, setCells] = useState(currentCells);

  return (
    <div className="board">
      <Cell value={cells[0]} onCellClick={() => onPlay(0)} />
      <Cell value={cells[1]} onCellClick={() => onPlay(1)} />
      <Cell value={cells[2]} onCellClick={() => onPlay(2)} />
      <Cell value={cells[3]} onCellClick={() => onPlay(3)} />
      <Cell value={cells[4]} onCellClick={() => onPlay(4)} />
      <Cell value={cells[5]} onCellClick={() => onPlay(5)} />
      <Cell value={cells[6]} onCellClick={() => onPlay(6)} />
      <Cell value={cells[7]} onCellClick={() => onPlay(7)} />
      <Cell value={cells[8]} onCellClick={() => onPlay(8)} />
    </div>
  );
}

function calculateWinner(cells) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }

  // jika semua cell sudah terisi dan tidak ada pemenang keluar
  if (!cells.includes(null)) {
    return 'draw';
  }
  return null;
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXisNext] = useState(true);
  const [currentCells, setCurrentCells] = useState(history[history.length - 1]);
  // const currentCells = history[history.length - 1];

  function handlePlay(index) {
    // jika cells sudah terisi keluar dari function untuk menghindari override cells
    if (currentCells[index] || calculateWinner(currentCells)) return;

    // duplikat array agar menerapkan immutability
    const newCells = currentCells.slice();
    newCells[index] = xIsNext ? 'x' : 'o';

    const newHistory = history.slice();
    newHistory.push(newCells);

    setHistory(newHistory);
    setXisNext(!xIsNext);
    setCurrentCells(newHistory[newHistory.length - 1]);

    // console.log(newHistory);
    // console.log(newHistory[newHistory.length - 1]);
  }

  // event handler untuk bermain lagi
  function playAgainHandle() {
    setHistory([Array(9).fill(null)]);
    setCurrentCells(Array(9).fill(null));
    if (winner === 'draw') {
      setXisNext(xIsNext);
    } else {
      setXisNext(winner === 'x' ? true : false);
    }
  }

  function backToHandle(index) {
    console.log(history[index]);
    setCurrentCells(history[index]);
  }

  // cek apakah sudah ada pemenang
  const winner = calculateWinner(currentCells);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next Player: ${xIsNext ? 'x' : 'o'}`;
  }

  return (
    <>
      <div className="game">
        <div>
          <p className="status">{status}</p>
          <Board
            currentCells={currentCells}
            xIsNext={xIsNext}
            onPlay={handlePlay}
          />
          <button
            className={'play-again-btn ' + (winner ? 'show' : '')}
            onClick={playAgainHandle}
          >
            Play Again
          </button>
        </div>
        <div className="game-history">
          <ol>
            {history.map((el, i) => (
              <li key={i}>
                <button onClick={() => backToHandle(i)}>
                  Go to {i > 0 ? 'Move #' + i : 'game start'}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}

export default Game;
