import { useState } from 'react';

function Cell({ value, onCellClick }) {
  return (
    <button className="cell" onClick={onCellClick}>
      {value}
    </button>
  );
}

function Board() {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);

  function handleClick(index) {
    // jika cells sudah terisi keluar dari function untuk menghindari override cells
    if (cells[index] || calculateWinner(cells)) return;

    // duplikat array agar menerapkan immutability
    const newCells = cells.slice();
    newCells[index] = xIsNext ? 'x' : 'o';
    setCells(newCells);
    setXisNext(!xIsNext);
  }

  // cek apakah sudah ada pemenang
  const winner = calculateWinner(cells);
  console.log(winner);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next Player: ${xIsNext ? 'x' : 'o'}`;
  }

  // event handler untuk bermain lagi
  function playAgainHandle() {
    setCells(Array(9).fill(null));
    if (winner === 'draw') {
      setXisNext(xIsNext);
    } else {
      setXisNext(winner === 'x' ? true : false);
    }
  }

  return (
    <div className="game-board">
      <p className="status">{status}</p>
      <div className="board">
        <Cell value={cells[0]} onCellClick={() => handleClick(0)} />
        <Cell value={cells[1]} onCellClick={() => handleClick(1)} />
        <Cell value={cells[2]} onCellClick={() => handleClick(2)} />
        <Cell value={cells[3]} onCellClick={() => handleClick(3)} />
        <Cell value={cells[4]} onCellClick={() => handleClick(4)} />
        <Cell value={cells[5]} onCellClick={() => handleClick(5)} />
        <Cell value={cells[6]} onCellClick={() => handleClick(6)} />
        <Cell value={cells[7]} onCellClick={() => handleClick(7)} />
        <Cell value={cells[8]} onCellClick={() => handleClick(8)} />
      </div>
      <button
        className="play-again-btn"
        disabled={winner ? false : true}
        onClick={playAgainHandle}
      >
        Play Again
      </button>
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

export default Board;
