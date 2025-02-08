import { calculateWinner } from '../utility';

export default function Board({ cells, xIsNext, onPlay, onPlayAgain }) {
  // handle saat cells diklik
  function handleClick(index) {
    // jika cells sudah terisi keluar dari function untuk menghindari override cells
    if (cells[index] || calculateWinner(cells)) return;

    // duplikat array agar menerapkan immutability
    const newCells = cells.slice();
    newCells[index] = xIsNext ? 'x' : 'o';
    onPlay(newCells); // kirim cells baru ke history
  }

  // cek apakah sudah ada pemenang
  const winner = calculateWinner(cells);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next Player: ${xIsNext ? 'x' : 'o'}`;
  }

  // event handler untuk bermain lagi
  // function playAgainHandle() {
  //   setCells(Array(9).fill(null));
  //   if (winner === 'draw') {
  //     setXisNext(xIsNext);
  //   } else {
  //     setXisNext(winner === 'x' ? true : false);
  //   }
  // }

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
        className={'play-again-btn ' + (winner ? 'show' : '')}
        onClick={() => onPlayAgain(winner)}
      >
        Play Again
      </button>
    </div>
  );
}

function Cell({ value, onCellClick }) {
  return (
    <button className="cell" onClick={onCellClick}>
      {value}
    </button>
  );
}
