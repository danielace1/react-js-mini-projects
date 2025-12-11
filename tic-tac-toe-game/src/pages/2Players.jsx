import { useState } from "react";
import XIcon from "../components/XIcon";
import OIcon from "../components/OIcon";

const HoverX = () => <XIcon size="h-10 w-10 opacity-40" />;
const HoverO = () => <OIcon size="h-10 w-10 opacity-40" />;

const VsPlayer = () => {
  const emptyBoard = Array(3)
    .fill(null)
    .map(() => Array(3).fill(""));

  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [hover, setHover] = useState(null);

  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [scoreTie, setScoreTie] = useState(0);

  const checkWinner = (b) => {
    const lines = [
      // rows
      [b[0][0], b[0][1], b[0][2]],
      [b[1][0], b[1][1], b[1][2]],
      [b[2][0], b[2][1], b[2][2]],
      // cols
      [b[0][0], b[1][0], b[2][0]],
      [b[0][1], b[1][1], b[2][1]],
      [b[0][2], b[1][2], b[2][2]],
      // diagonals
      [b[0][0], b[1][1], b[2][2]],
      [b[0][2], b[1][1], b[2][0]],
    ];

    for (let line of lines) {
      if (line.every((v) => v === "X")) return "X";
      if (line.every((v) => v === "O")) return "O";
    }

    if (b.flat().every((v) => v !== "")) return "tie";

    return null;
  };

  const handleCellClick = (r, c) => {
    if (board[r][c] !== "") return;

    const newBoard = board.map((row, i) =>
      row.map((cell, j) => (i === r && j === c ? currentPlayer : cell))
    );

    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setTimeout(() => {
        if (result === "X") setScoreX((s) => s + 1);
        else if (result === "O") setScoreO((s) => s + 1);
        else setScoreTie((s) => s + 1);

        alert(result === "tie" ? "It's a tie!" : `${result} wins!`);
        restartGame();
      }, 200);
      return;
    }

    setCurrentPlayer((p) => (p === "X" ? "O" : "X"));
  };

  const restartGame = () => {
    setBoard(emptyBoard);
    setCurrentPlayer("X");
  };

  // Render Cell
  const renderCell = (r, c) => {
    const value = board[r][c];
    const isHover = hover?.r === r && hover?.c === c && value === "";

    return (
      <div
        key={`${r}-${c}`}
        className="aspect-square bg-zinc-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-zinc-600 transition"
        onMouseEnter={() => setHover({ r, c })}
        onMouseLeave={() => setHover(null)}
        onClick={() => handleCellClick(r, c)}
      >
        {value === "X" && <XIcon />}
        {value === "O" && <OIcon />}
        {!value && isHover && (currentPlayer === "X" ? <HoverX /> : <HoverO />)}
      </div>
    );
  };

  return (
    <div className="bg-zinc-800 min-h-screen p-5 md:p-10 flex justify-center">
      <div className="text-white w-full max-w-md mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            <XIcon size="h-7 w-7" />
            <OIcon size="h-7 w-7" />
          </div>

          <div className="bg-zinc-700 flex items-center px-4 py-2 rounded-lg border-b border-gray-600">
            {currentPlayer === "X" ? (
              <XIcon size="h-5 w-5 mr-1" />
            ) : (
              <OIcon size="h-5 w-5 mr-1" />
            )}
            TURN
          </div>

          <button
            onClick={restartGame}
            className="bg-zinc-600 hover:bg-zinc-500 p-2 rounded-lg transition"
            title="Restart Game"
          >
            <svg width="26" height="26" fill="currentColor">
              <path d="M12 20q-3.35 0-5.675-2.325T4 12q0-3.35 2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V5q0-.425.288-.712T19 4q.425 0 .713.288T20 5v5q0 .425-.288.713T19 11h-5q-.425 0-.712-.288T13 10q0-.425.288-.712T14 9h3.2q-.8-1.4-2.187-2.2T12 6Q9.5 6 7.75 7.75T6 12q0 2.5 1.75 4.25T12 18q1.7 0 3.113-.862t2.187-2.313q.2-.35.563-.487t.737-.013q.4.125.575.525t-.025.75q-1.025 2-2.925 3.2T12 20"></path>
            </svg>
          </button>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((r) => [0, 1, 2].map((c) => renderCell(r, c)))}
        </div>

        {/* Scoreboard */}
        <div className="grid grid-cols-3 gap-4 text-center font-semibold">
          <div className="bg-amber-500 rounded-lg py-3">
            <div className="text-sm">X (Player 1)</div>
            <div className="text-xl font-bold">{scoreX}</div>
          </div>

          <div className="bg-zinc-500 rounded-lg py-3">
            <div className="text-sm">TIES</div>
            <div className="text-xl font-bold">{scoreTie}</div>
          </div>

          <div className="bg-sky-500 rounded-lg py-3">
            <div className="text-sm">O (Player 2)</div>
            <div className="text-xl font-bold">{scoreO}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VsPlayer;
