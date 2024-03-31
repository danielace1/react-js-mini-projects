import { useState, useEffect } from "react";

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 64 64"
    className="fill-current text-amber-500 h-11 w-11 mx-auto"
  >
    <path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"></path>
  </svg>
);

const OIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 64 64"
      className="fill-current text-sky-500 h-11 w-11 mx-auto"
    >
      <path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"></path>
    </svg>
  );
};

const hoverX = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 64 64"
    className="stroke-current text-amber-500 h-11 w-11 mx-auto"
  >
    <path
      fill="none"
      strokeWidth="2"
      d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
    />
  </svg>
);

const hoverO = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 64 64"
    className="stroke-current text-sky-500 h-11 w-11 mx-auto"
  >
    <path
      fill="none"
      strokeWidth="2"
      d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
    />
  </svg>
);

const VsPlayer = () => {
  const initialBoardState = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const [hoveredCell, setHoveredCell] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [board, setBoard] = useState(initialBoardState);

  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [tieScore, setTieScore] = useState(0);

  useEffect(() => {
    const winner = checkWinner(board);
    if (winner === "X") {
      setPlayer1Score((prevScore) => prevScore + 1);
    } else if (winner === "O") {
      setPlayer2Score((prevScore) => prevScore + 1);
    } else if (winner === "tie") {
      setTieScore((prevScore) => prevScore + 1);
    }
  }, [board]);

  // Checking Winner
  const checkWinner = (board) => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] !== "" &&
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2]
      ) {
        return board[i][0];
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] !== "" &&
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i]
      ) {
        return board[0][i];
      }
    }

    // Check diagonals
    if (
      board[0][0] !== "" &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      return board[0][0];
    }
    if (
      board[0][2] !== "" &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      return board[0][2];
    }

    // Check for tie
    let isFull = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          isFull = false;
          break;
        }
      }
      if (!isFull) {
        break;
      }
    }
    if (isFull) {
      return "tie";
    }
    // If no winner and the board is not full, return null
    return null;
  };

  const handleCellClick = (row, col) => {
    const newBoard = [...board];
    if (newBoard[row][col] === "") {
      newBoard[row][col] = currentPlayer;
      setBoard(newBoard);
      const winner = checkWinner(newBoard);
      if (winner) {
        let message;
        if (winner === "tie") {
          message = "It's a tie!";
        } else {
          message = `${winner} wins!`;
        }
        setTimeout(() => {
          alert(message);
          setBoard(initialBoardState);
          setCurrentPlayer("X");
        }, 200); // Delay the alert to ensure the last move is rendered
        return; // Exit the function early if there's a winner
      }
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const handleCellHover = (row, col) => {
    setHoveredCell({ row, col });
  };

  const renderCell = (row, col) => {
    const cellValue = board[row][col];
    const isHovered =
      hoveredCell && hoveredCell.row === row && hoveredCell.col === col;
    return (
      <td
        key={`${row}-${col}`}
        className="table-cell hover:cursor-pointer"
        onClick={() => handleCellClick(row, col)}
        onMouseEnter={() => handleCellHover(row, col)}
        onMouseLeave={() => setHoveredCell(null)}
      >
        {isHovered && !cellValue && (currentPlayer === "X" ? hoverX : hoverO)}
        {cellValue === "X" && <XIcon />}
        {cellValue === "O" && <OIcon />}
      </td>
    );
  };

  const renderRow = (rowIndex) => {
    return (
      <tr key={rowIndex}>
        {[0, 1, 2].map((colIndex) => renderCell(rowIndex, colIndex))}
      </tr>
    );
  };

  const renderBoard = () => {
    return <tbody>{[0, 1, 2].map((rowIndex) => renderRow(rowIndex))}</tbody>;
  };

  return (
    <div className="bg-zinc-800 p-10 min-h-screen">
      <div className="mx-auto max-w-[480px] text-white">
        <div className="flex items-center justify-between space-x-5 ml-6 mt-4">
          <div className="flex items-center space-x-3">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 64 64"
                className="fill-current text-amber-500 h-7 w-7"
              >
                <path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"></path>
              </svg>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 64 64"
                className="fill-current text-sky-500 h-7 w-7"
              >
                <path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"></path>
              </svg>
            </div>
          </div>

          <div className="flex items-center bg-zinc-700 px-5 py-2 rounded-lg border-b border-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 64 64"
              className="fill-current text-white h-5 w-5 mr-2"
            >
              <path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"></path>
            </svg>{" "}
            TURN
          </div>

          <div className="bg-zinc-500 p-2 !mr-5 rounded-lg hover:cursor-pointer hover:bg-zinc-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              className="fill-current font-semibold"
            >
              <path d="M12 20q-3.35 0-5.675-2.325T4 12q0-3.35 2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V5q0-.425.288-.712T19 4q.425 0 .713.288T20 5v5q0 .425-.288.713T19 11h-5q-.425 0-.712-.288T13 10q0-.425.288-.712T14 9h3.2q-.8-1.4-2.187-2.2T12 6Q9.5 6 7.75 7.75T6 12q0 2.5 1.75 4.25T12 18q1.7 0 3.113-.862t2.187-2.313q.2-.35.563-.487t.737-.013q.4.125.575.525t-.025.75q-1.025 2-2.925 3.2T12 20"></path>
            </svg>
          </div>
        </div>

        <table className="w-full border-separate border-spacing-5">
          {renderBoard()}
        </table>

        <div className="flex items-center justify-between ml-6">
          <div className="flex flex-col items-center bg-amber-500 px-8 py-3 rounded-lg shadow">
            <span className="text-sm tracking-widest">
              {" "}
              X <span className="text-xs">(Player 1)</span>
            </span>
            <h1 className="text-xl font-semibold">{player1Score}</h1>
          </div>
          <div className="flex flex-col items-center bg-zinc-500 px-11 py-3 rounded-lg shadow">
            <span className="text-sm tracking-widest">TIES</span>
            <h1 className="text-xl font-semibold">{tieScore}</h1>
          </div>
          <div className="flex flex-col items-center bg-sky-500 px-8 py-3 !mr-5  rounded-lg shadow">
            <span className="text-sm tracking-widest">
              {" "}
              O <span className="text-xs">(Player 2)</span>
            </span>
            <h1 className="text-xl font-semibold">{player2Score}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VsPlayer;
