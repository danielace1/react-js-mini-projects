import { useState, useEffect } from "react";
import XIcon from "../components/XIcon";
import OIcon from "../components/OIcon";

const HoverX = () => <XIcon size="h-10 w-10 opacity-40" />;
const HoverO = () => <OIcon size="h-10 w-10 opacity-40" />;

const VsCPU = () => {
  const emptyBoard = Array(3)
    .fill(null)
    .map(() => Array(3).fill(""));

  const role = JSON.parse(localStorage.getItem("role"));
  const userPlayer = role || "X";
  const cpuPlayer = userPlayer === "X" ? "O" : "X";

  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [hover, setHover] = useState(null);

  const [userScore, setUserScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [tieScore, setTieScore] = useState(0);

  const [cpuThinking, setCpuThinking] = useState(false);

  const checkWinner = (b) => {
    const lines = [
      ...b,
      [b[0][0], b[1][0], b[2][0]],
      [b[0][1], b[1][1], b[2][1]],
      [b[0][2], b[1][2], b[2][2]],
      [b[0][0], b[1][1], b[2][2]],
      [b[0][2], b[1][1], b[2][0]],
    ];

    for (let line of lines) {
      if (line.every((v) => v === "X")) return "X";
      if (line.every((v) => v === "O")) return "O";
    }

    return b.flat().every((v) => v !== "") ? "tie" : null;
  };

  // Minimax Algorithm
  const scores = {
    [cpuPlayer]: 1,
    [userPlayer]: -1,
    tie: 0,
  };

  const minimax = (b, isMaximizing) => {
    const winner = checkWinner(b);
    if (winner !== null) return scores[winner];

    let best = isMaximizing ? -Infinity : Infinity;

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (b[r][c] === "") {
          const newBoard = structuredClone(b);
          newBoard[r][c] = isMaximizing ? cpuPlayer : userPlayer;
          const score = minimax(newBoard, !isMaximizing);
          best = isMaximizing ? Math.max(best, score) : Math.min(best, score);
        }
      }
    }

    return best;
  };

  const findBestMove = (b) => {
    let bestScore = -Infinity;
    let move = null;

    // Difficulty tuning (0.9 = 90% smart, 10% random)
    if (Math.random() > 0.9) {
      const empty = [];
      b.forEach((row, r) =>
        row.forEach((cell, c) => {
          if (!cell) empty.push({ r, c });
        })
      );
      return empty[Math.floor(Math.random() * empty.length)];
    }

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (b[r][c] === "") {
          const newBoard = structuredClone(b);
          newBoard[r][c] = cpuPlayer;
          const score = minimax(newBoard, false);
          if (score > bestScore) {
            bestScore = score;
            move = { r, c };
          }
        }
      }
    }

    return move;
  };

  useEffect(() => {
    const winner = checkWinner(board);
    if (!winner) {
      if (currentPlayer === cpuPlayer) {
        setCpuThinking(true);
        setTimeout(() => {
          const move = findBestMove(board);
          playMove(move.r, move.c, cpuPlayer);
          setCpuThinking(false);
        }, 600);
      }
      return;
    }

    // Update scores
    if (winner === userPlayer) setUserScore((x) => x + 1);
    else if (winner === cpuPlayer) setCpuScore((x) => x + 1);
    else setTieScore((x) => x + 1);

    setTimeout(() => {
      alert(winner === "tie" ? "It's a tie!" : `${winner} wins!`);
      restartGame();
    }, 200);
  }, [board, currentPlayer]);

  const playMove = (r, c, player) => {
    if (board[r][c] !== "") return;

    const newBoard = structuredClone(board);
    newBoard[r][c] = player;

    setBoard(newBoard);
    setCurrentPlayer((p) => (p === "X" ? "O" : "X"));
  };

  const restartGame = () => {
    setBoard(emptyBoard);
    setCurrentPlayer("X");
  };

  const renderCell = (r, c) => {
    const val = board[r][c];
    const isHover =
      !cpuThinking &&
      currentPlayer === userPlayer &&
      hover?.r === r &&
      hover?.c === c &&
      !val;

    return (
      <div
        key={r + "-" + c}
        className="aspect-square bg-zinc-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-zinc-600 transition"
        onMouseEnter={() => setHover({ r, c })}
        onMouseLeave={() => setHover(null)}
        onClick={() => {
          if (cpuThinking) return;
          if (currentPlayer !== userPlayer) return;
          playMove(r, c, userPlayer);
        }}
      >
        {val === "X" && <XIcon />}
        {val === "O" && <OIcon />}

        {!val && isHover && (userPlayer === "X" ? <HoverX /> : <HoverO />)}
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
              <path d="M12 20q-3.35 0-5.675-2.325T4 12q0-3.35 2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V5h2v5h-5v-2h3.2q-.8-1.4-2.187-2.2T12 6Q9.5 6 7.75 7.75T6 12q0 2.5 1.75 4.25T12 18q1.7 0 3.113-.862t2.187-2.313l1.3.75q-1.025 2-2.925 3.2T12 20" />
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
            <div className="text-sm">YOU ({userPlayer})</div>
            <div className="text-xl font-bold">{userScore}</div>
          </div>

          <div className="bg-zinc-500 rounded-lg py-3">
            <div className="text-sm">TIES</div>
            <div className="text-xl font-bold">{tieScore}</div>
          </div>

          <div className="bg-sky-500 rounded-lg py-3">
            <div className="text-sm">CPU ({cpuPlayer})</div>
            <div className="text-xl font-bold">{cpuScore}</div>
          </div>
        </div>

        {cpuThinking && (
          <p className="text-center text-gray-300 animate-pulse">
            CPU is thinking…
          </p>
        )}
      </div>
    </div>
  );
};

export default VsCPU;
